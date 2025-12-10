const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GreenBallot Contract", function () {
  let greenBallot;
  let admin;
  let voter1;
  let voter2;
  let voter3;

  beforeEach(async function () {
    // Get signers
    [admin, voter1, voter2, voter3] = await ethers.getSigners();

    // Deploy contract
    const GreenBallot = await ethers.getContractFactory("GreenBallot");
    greenBallot = await GreenBallot.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      expect(await greenBallot.admin()).to.equal(admin.address);
    });

    it("Should start with system active", async function () {
      expect(await greenBallot.systemActive()).to.equal(true);
    });

    it("Should initialize with zero candidates, voters, and sessions", async function () {
      expect(await greenBallot.candidateCount()).to.equal(0);
      expect(await greenBallot.voterCount()).to.equal(0);
      expect(await greenBallot.sessionCount()).to.equal(0);
    });

    it("Should return admin address", async function () {
      expect(await greenBallot.getAdmin()).to.equal(admin.address);
    });
  });

  describe("Candidate Registration", function () {
    it("Should register a candidate", async function () {
      await greenBallot.registerCandidate(
        "Alice Johnson",
        "Democratic Party",
        "Education and Healthcare Reform"
      );

      expect(await greenBallot.candidateCount()).to.equal(1);

      const candidate = await greenBallot.getCandidateInfo(1);
      expect(candidate.candidateName).to.equal("Alice Johnson");
      expect(candidate.candidateParty).to.equal("Democratic Party");
      expect(candidate.candidatePlatform).to.equal("Education and Healthcare Reform");
      expect(candidate.voteCount).to.equal(0);
    });

    it("Should register multiple candidates", async function () {
      await greenBallot.registerCandidate(
        "Alice Johnson",
        "Democratic Party",
        "Education Reform"
      );
      await greenBallot.registerCandidate(
        "Bob Smith",
        "Republican Party",
        "Economic Growth"
      );
      await greenBallot.registerCandidate(
        "Carol White",
        "Independent",
        "Environmental Protection"
      );

      expect(await greenBallot.candidateCount()).to.equal(3);
    });

    it("Should reject empty candidate name", async function () {
      await expect(
        greenBallot.registerCandidate("", "Party", "Platform")
      ).to.be.revertedWith("Candidate name cannot be empty");
    });

    it("Should reject empty party name", async function () {
      await expect(
        greenBallot.registerCandidate("Name", "", "Platform")
      ).to.be.revertedWith("Party name cannot be empty");
    });

    it("Should only allow admin to register candidates", async function () {
      await expect(
        greenBallot.connect(voter1).registerCandidate(
          "Name",
          "Party",
          "Platform"
        )
      ).to.be.revertedWith("Only admin can call this function");
    });

    it("Should emit CandidateRegistered event", async function () {
      await expect(
        greenBallot.registerCandidate("Alice Johnson", "Democratic Party", "Reform")
      )
        .to.emit(greenBallot, "CandidateRegistered")
        .withArgs(1, "Alice Johnson", "Democratic Party");
    });
  });

  describe("Voter Registration", function () {
    it("Should register a voter", async function () {
      const voter = voter1;
      await greenBallot.connect(voter).registerVoter(
        "John Doe",
        "Nigerian",
        25,
        "Lagos State"
      );

      expect(await greenBallot.voterCount()).to.equal(1);

      const voterInfo = await greenBallot.getVoterInfo(voter.address);
      expect(voterInfo.votersName).to.equal("John Doe");
      expect(voterInfo.votersNationality).to.equal("Nigerian");
      expect(voterInfo.votersAge).to.equal(25);
      expect(voterInfo.votersLocalGovernmentArea).to.equal("Lagos State");
      expect(voterInfo.hasVoted).to.equal(false);
      expect(voterInfo.isRegistered).to.equal(true);
    });

    it("Should reject voter under 18 years old", async function () {
      await expect(
        greenBallot.connect(voter1).registerVoter(
          "Young Voter",
          "Nigerian",
          17,
          "Lagos State"
        )
      ).to.be.revertedWith("Voter must be 18 years or older");
    });

    it("Should reject empty name", async function () {
      await expect(
        greenBallot.connect(voter1).registerVoter(
          "",
          "Nigerian",
          25,
          "Lagos State"
        )
      ).to.be.revertedWith("Name cannot be empty");
    });

    it("Should reject empty nationality", async function () {
      await expect(
        greenBallot.connect(voter1).registerVoter(
          "John Doe",
          "",
          25,
          "Lagos State"
        )
      ).to.be.revertedWith("Nationality cannot be empty");
    });

    it("Should reject empty LGA", async function () {
      await expect(
        greenBallot.connect(voter1).registerVoter(
          "John Doe",
          "Nigerian",
          25,
          ""
        )
      ).to.be.revertedWith("LGA cannot be empty");
    });

    it("Should prevent duplicate voter registration", async function () {
      await greenBallot.connect(voter1).registerVoter(
        "John Doe",
        "Nigerian",
        25,
        "Lagos State"
      );

      await expect(
        greenBallot.connect(voter1).registerVoter(
          "John Doe",
          "Nigerian",
          25,
          "Lagos State"
        )
      ).to.be.revertedWith("Voter already registered");
    });

    it("Should emit VoterRegistered event", async function () {
      await expect(
        greenBallot.connect(voter1).registerVoter(
          "John Doe",
          "Nigerian",
          25,
          "Lagos State"
        )
      )
        .to.emit(greenBallot, "VoterRegistered")
        .withArgs(voter1.address, "John Doe", "Nigerian");
    });
  });

  describe("Voting Session Management", function () {
    it("Should create a voting session", async function () {
      const now = Math.floor(Date.now() / 1000);
      const startTime = now + 3600; // 1 hour from now
      const endTime = now + 7200; // 2 hours from now

      await greenBallot.createVotingSession(
        "Presidential Election 2025",
        startTime,
        endTime
      );

      expect(await greenBallot.sessionCount()).to.equal(1);

      const session = await greenBallot.getVotingSessionInfo(1);
      expect(session.electionName).to.equal("Presidential Election 2025");
      expect(session.startTime).to.equal(startTime);
      expect(session.endTime).to.equal(endTime);
      expect(session.isActive).to.equal(true);
    });

    it("Should reject invalid session times", async function () {
      const now = Math.floor(Date.now() / 1000);
      const startTime = now + 7200;
      const endTime = now + 3600; // End before start

      await expect(
        greenBallot.createVotingSession("Election", startTime, endTime)
      ).to.be.revertedWith("Start time must be before end time");
    });

    it("Should reject session with end time in the past", async function () {
      const now = Math.floor(Date.now() / 1000);
      const startTime = now - 3600;
      const endTime = now - 1800;

      await expect(
        greenBallot.createVotingSession("Election", startTime, endTime)
      ).to.be.revertedWith("End time must be in the future");
    });

    it("Should toggle voting session active status", async function () {
      const now = Math.floor(Date.now() / 1000);
      await greenBallot.createVotingSession(
        "Election",
        now + 3600,
        now + 7200
      );

      await greenBallot.toggleVotingSession(1);

      const session = await greenBallot.getVotingSessionInfo(1);
      expect(session.isActive).to.equal(false);

      await greenBallot.toggleVotingSession(1);
      const updatedSession = await greenBallot.getVotingSessionInfo(1);
      expect(updatedSession.isActive).to.equal(true);
    });

    it("Should emit VotingSessionCreated event", async function () {
      const now = Math.floor(Date.now() / 1000);
      const startTime = now + 3600;
      const endTime = now + 7200;

      await expect(
        greenBallot.createVotingSession("Election", startTime, endTime)
      )
        .to.emit(greenBallot, "VotingSessionCreated")
        .withArgs(1, "Election", startTime, endTime);
    });
  });

  describe("Voting System Control", function () {
    it("Should toggle system active status", async function () {
      expect(await greenBallot.systemActive()).to.equal(true);

      await greenBallot.toggleSystem();
      expect(await greenBallot.systemActive()).to.equal(false);

      await greenBallot.toggleSystem();
      expect(await greenBallot.systemActive()).to.equal(true);
    });

    it("Should prevent voter registration when system is inactive", async function () {
      await greenBallot.toggleSystem();

      await expect(
        greenBallot.connect(voter1).registerVoter(
          "John Doe",
          "Nigerian",
          25,
          "Lagos State"
        )
      ).to.be.revertedWith("System is not active");
    });

    it("Should emit SystemStateChanged event", async function () {
      await expect(greenBallot.toggleSystem())
        .to.emit(greenBallot, "SystemStateChanged");
    });
  });

  describe("Voter Unregistration", function () {
    it("Should unregister a voter", async function () {
      await greenBallot.connect(voter1).registerVoter(
        "John Doe",
        "Nigerian",
        25,
        "Lagos State"
      );

      expect(await greenBallot.voterCount()).to.equal(1);

      await greenBallot.unregisterVoter(voter1.address);

      expect(await greenBallot.voterCount()).to.equal(0);
    });

    it("Should only allow admin to unregister voters", async function () {
      await greenBallot.connect(voter1).registerVoter(
        "John Doe",
        "Nigerian",
        25,
        "Lagos State"
      );

      await expect(
        greenBallot.connect(voter2).unregisterVoter(voter1.address)
      ).to.be.revertedWith("Only admin can call this function");
    });

    it("Should reject unregistering non-existent voter", async function () {
      await expect(
        greenBallot.unregisterVoter(voter1.address)
      ).to.be.revertedWith("Voter is not registered");
    });

    it("Should emit VoterUnregistered event", async function () {
      await greenBallot.connect(voter1).registerVoter(
        "John Doe",
        "Nigerian",
        25,
        "Lagos State"
      );

      await expect(greenBallot.unregisterVoter(voter1.address))
        .to.emit(greenBallot, "VoterUnregistered")
        .withArgs(voter1.address, "John Doe");
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      // Register candidates
      await greenBallot.registerCandidate(
        "Alice Johnson",
        "Democratic Party",
        "Education Reform"
      );
      await greenBallot.registerCandidate(
        "Bob Smith",
        "Republican Party",
        "Economic Growth"
      );

      // Register voters
      await greenBallot.connect(voter1).registerVoter(
        "Voter One",
        "Nigerian",
        25,
        "Lagos State"
      );
      await greenBallot.connect(voter2).registerVoter(
        "Voter Two",
        "Nigerian",
        30,
        "Ogun State"
      );
      await greenBallot.connect(voter3).registerVoter(
        "Voter Three",
        "Nigerian",
        28,
        "Edo State"
      );

      // Create voting session (start time in the past, end time in the future)
      const now = Math.floor(Date.now() / 1000);
      await greenBallot.createVotingSession(
        "Election 2025",
        now - 3600,
        now + 7200
      );
    });

    it("Should cast a vote", async function () {
      await greenBallot.connect(voter1).castVote(1, 1);

      const voterInfo = await greenBallot.getVoterInfo(voter1.address);
      expect(voterInfo.hasVoted).to.equal(true);
      expect(voterInfo.candidateVotedFor).to.equal(1);

      const candidate = await greenBallot.getCandidateInfo(1);
      expect(candidate.voteCount).to.equal(1);
    });

    it("Should reject unregistered voter from voting", async function () {
      await expect(
        greenBallot.connect(admin).castVote(1, 1)
      ).to.be.revertedWith("Voter is not registered");
    });

    it("Should prevent voter from voting twice", async function () {
      await greenBallot.connect(voter1).castVote(1, 1);

      await expect(
        greenBallot.connect(voter1).castVote(2, 1)
      ).to.be.revertedWith("Voter has already voted");
    });

    it("Should reject invalid candidate ID", async function () {
      await expect(
        greenBallot.connect(voter1).castVote(99, 1)
      ).to.be.revertedWith("Invalid candidate ID");
    });

    it("Should reject voting for candidate 0", async function () {
      await expect(
        greenBallot.connect(voter1).castVote(0, 1)
      ).to.be.revertedWith("Invalid candidate ID");
    });

    it("Should reject invalid session ID", async function () {
      await expect(
        greenBallot.connect(voter1).castVote(1, 99)
      ).to.be.revertedWith("Invalid session ID");
    });

    it("Should reject voting when system is inactive", async function () {
      await greenBallot.toggleSystem();

      await expect(
        greenBallot.connect(voter1).castVote(1, 1)
      ).to.be.revertedWith("System is not active");
    });

    it("Should reject voting when session is inactive", async function () {
      await greenBallot.toggleVotingSession(1);

      await expect(
        greenBallot.connect(voter1).castVote(1, 1)
      ).to.be.revertedWith("Voting session is not active");
    });

    it("Should emit VoteCasted event", async function () {
      const tx = greenBallot.connect(voter1).castVote(1, 1);
      await expect(tx).to.emit(greenBallot, "VoteCasted");
    });

    it("Should tally votes correctly", async function () {
      await greenBallot.connect(voter1).castVote(1, 1);
      await greenBallot.connect(voter2).castVote(1, 1);
      await greenBallot.connect(voter3).castVote(2, 1);

      const candidate1 = await greenBallot.getCandidateInfo(1);
      const candidate2 = await greenBallot.getCandidateInfo(2);

      expect(candidate1.voteCount).to.equal(2);
      expect(candidate2.voteCount).to.equal(1);
    });
  });

  describe("Results Functions", function () {
    beforeEach(async function () {
      // Register candidates
      await greenBallot.registerCandidate("Alice", "Party A", "Platform A");
      await greenBallot.registerCandidate("Bob", "Party B", "Platform B");
      await greenBallot.registerCandidate("Carol", "Party C", "Platform C");

      // Register voters
      await greenBallot.connect(voter1).registerVoter(
        "Voter 1",
        "Nigerian",
        25,
        "State A"
      );
      await greenBallot.connect(voter2).registerVoter(
        "Voter 2",
        "Nigerian",
        30,
        "State B"
      );
      await greenBallot.connect(voter3).registerVoter(
        "Voter 3",
        "Nigerian",
        28,
        "State C"
      );

      // Create voting session
      const now = Math.floor(Date.now() / 1000);
      await greenBallot.createVotingSession(
        "Election",
        now - 3600,
        now + 7200
      );

      // Cast votes
      await greenBallot.connect(voter1).castVote(1, 1);
      await greenBallot.connect(voter2).castVote(1, 1);
      await greenBallot.connect(voter3).castVote(2, 1);
    });

    it("Should get winning candidate", async function () {
      const winner = await greenBallot.getWinningCandidate();
      expect(winner.candidateId).to.equal(1);
      expect(winner.voteCount).to.equal(2);
      expect(winner.candidateName).to.equal("Alice");
    });

    it("Should get session results", async function () {
      const results = await greenBallot.getSessionResults(1);
      expect(results.length).to.equal(3);
      expect(results[0].voteCount).to.equal(2);
      expect(results[1].voteCount).to.equal(1);
      expect(results[2].voteCount).to.equal(0);
    });

    it("Should get system statistics", async function () {
      const stats = await greenBallot.getSystemStats();
      expect(stats.totalCandidates).to.equal(3);
      expect(stats.totalRegisteredVoters).to.equal(3);
      expect(stats.totalVotes).to.equal(3);
      expect(stats.isSystemActive).to.equal(true);
    });

    it("Should get session voters", async function () {
      const sessionVoters = await greenBallot.getSessionVoters(1);
      expect(sessionVoters.length).to.equal(3);
      expect(sessionVoters[0]).to.equal(voter1.address);
      expect(sessionVoters[1]).to.equal(voter2.address);
      expect(sessionVoters[2]).to.equal(voter3.address);
    });

    it("Should check if voter has voted", async function () {
      expect(await greenBallot.hasVoterVoted(voter1.address)).to.equal(true);
      expect(await greenBallot.hasVoterVoted(voter2.address)).to.equal(true);
      expect(await greenBallot.hasVoterVoted(voter3.address)).to.equal(true);
    });

    it("Should get candidate vote count", async function () {
      expect(await greenBallot.getCandidateVoteCount(1)).to.equal(2);
      expect(await greenBallot.getCandidateVoteCount(2)).to.equal(1);
      expect(await greenBallot.getCandidateVoteCount(3)).to.equal(0);
    });
  });

  describe("Admin Functions", function () {
    beforeEach(async function () {
      // Register candidates
      await greenBallot.registerCandidate("Alice", "Party A", "Platform A");
      await greenBallot.registerCandidate("Bob", "Party B", "Platform B");
    });

    it("Should allow admin to interact with candidates", async function () {
      const candidate = await greenBallot.getCandidateInfo(1);
      expect(candidate.candidateName).to.equal("Alice");
      expect(candidate.candidateParty).to.equal("Party A");
      expect(candidate.voteCount).to.equal(0);
    });

    it("Should only allow admin functions", async function () {
      await expect(
        greenBallot.connect(voter1).registerCandidate("Name", "Party", "Platform")
      ).to.be.revertedWith("Only admin can call this function");
    });
  });

  describe("Edge Cases", function () {
    it("Should handle multiple voting sessions", async function () {
      const now = Math.floor(Date.now() / 1000);

      await greenBallot.createVotingSession(
        "Election 1",
        now + 3600,
        now + 7200
      );
      await greenBallot.createVotingSession(
        "Election 2",
        now + 10800,
        now + 14400
      );
      await greenBallot.createVotingSession(
        "Election 3",
        now + 18000,
        now + 21600
      );

      expect(await greenBallot.sessionCount()).to.equal(3);

      const session1 = await greenBallot.getVotingSessionInfo(1);
      const session2 = await greenBallot.getVotingSessionInfo(2);
      const session3 = await greenBallot.getVotingSessionInfo(3);

      expect(session1.electionName).to.equal("Election 1");
      expect(session2.electionName).to.equal("Election 2");
      expect(session3.electionName).to.equal("Election 3");
    });

    it("Should handle zero vote counts", async function () {
      await greenBallot.registerCandidate("Alice", "Party A", "Platform");
      await greenBallot.registerCandidate("Bob", "Party B", "Platform");

      const candidate1 = await greenBallot.getCandidateInfo(1);
      const candidate2 = await greenBallot.getCandidateInfo(2);

      expect(candidate1.voteCount).to.equal(0);
      expect(candidate2.voteCount).to.equal(0);
    });
  });
});
