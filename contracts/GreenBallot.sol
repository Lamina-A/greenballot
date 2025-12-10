// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title GreenBallot
 * @dev A comprehensive voting system contract with voter registration, voting, and result tallying
 */
contract GreenBallot {
    // ==================== STRUCTS ====================
    
    struct RegisteredVoter {
        string votersName;
        string votersNationality;
        int256 votersAge;
        string votersLocalGovernmentArea;
        address walletAddress;
        bool isRegistered;
        bool hasVoted;
        uint256 candidateVotedFor;
    }

    struct Candidate {
        uint256 candidateId;
        string candidateName;
        string candidateParty;
        string candidatePlatform;
        uint256 voteCount;
    }

    struct VotingSession {
        uint256 sessionId;
        string electionName;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        uint256 totalVoters;
        uint256 votesCount;
    }

    // ==================== STATE VARIABLES ====================
    
    address public admin;
    bool public systemActive;
    
    uint256 public candidateCount;
    uint256 public voterCount;
    uint256 public sessionCount;
    
    mapping(address => RegisteredVoter) public voters;
    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => VotingSession) public votingSessions;
    mapping(address => bool) public isVoterRegistered;
    mapping(uint256 => address[]) public sessionVoters;

    // ==================== EVENTS ====================
    
    event VoterRegistered(
        address indexed voterAddress,
        string votersName,
        string votersNationality
    );

    event VoterUnregistered(
        address indexed voterAddress,
        string votersName
    );

    event CandidateRegistered(
        uint256 indexed candidateId,
        string candidateName,
        string candidateParty
    );

    event VoteCasted(
        address indexed voter,
        uint256 indexed candidateId,
        uint256 timestamp
    );

    event VotingSessionCreated(
        uint256 indexed sessionId,
        string electionName,
        uint256 startTime,
        uint256 endTime
    );

    event VotingSessionToggled(
        uint256 indexed sessionId,
        bool isActive
    );

    event SystemStateChanged(
        bool newState,
        uint256 timestamp
    );

    event ResultsTallied(
        uint256 indexed sessionId,
        uint256 totalVotes,
        uint256 timestamp
    );

    // ==================== MODIFIERS ====================
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
  
    modifier systemMustBeActive() {
        require(systemActive, "System is not active");
        _;
    }

    modifier voterMustBeRegistered() {
        require(isVoterRegistered[msg.sender], "Voter is not registered");
        _;
    }

    modifier voterMustNotHaveVoted() {
        require(!voters[msg.sender].hasVoted, "Voter has already voted");
        _;
    }

    modifier validCandidate(uint256 _candidateId) {
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID");
        _;
    }

    modifier validVoterAge(int256 _age) {
        require(_age >= 18, "Voter must be 18 years or older");
        _;
    }

    // ==================== CONSTRUCTOR ====================
    
    constructor() {
        admin = msg.sender;
        systemActive = true;
        candidateCount = 0;
        voterCount = 0;
        sessionCount = 0;
    }

    // ==================== ADMIN FUNCTIONS ====================
    
    /**
     * @dev Register a new candidate for voting
     * @param _candidateName Name of the candidate
     * @param _candidateParty Political party of the candidate
     * @param _candidatePlatform Campaign platform/manifesto
     */
    function registerCandidate(
        string memory _candidateName,
        string memory _candidateParty,
        string memory _candidatePlatform
    ) public onlyAdmin systemMustBeActive {
        require(bytes(_candidateName).length > 0, "Candidate name cannot be empty");
        require(bytes(_candidateParty).length > 0, "Party name cannot be empty");

        candidateCount++;
        candidates[candidateCount] = Candidate({
            candidateId: candidateCount,
            candidateName: _candidateName,
            candidateParty: _candidateParty,
            candidatePlatform: _candidatePlatform,
            voteCount: 0
        });

        emit CandidateRegistered(candidateCount, _candidateName, _candidateParty);
    }

    /**
     * @dev Create a new voting session
     * @param _electionName Name of the election
     * @param _startTime Start timestamp of voting
     * @param _endTime End timestamp of voting
     */
    function createVotingSession(
        string memory _electionName,
        uint256 _startTime,
        uint256 _endTime
    ) public onlyAdmin {
        require(bytes(_electionName).length > 0, "Election name cannot be empty");
        require(_startTime < _endTime, "Start time must be before end time");
        require(_endTime > block.timestamp, "End time must be in the future");

        sessionCount++;
        votingSessions[sessionCount] = VotingSession({
            sessionId: sessionCount,
            electionName: _electionName,
            startTime: _startTime,
            endTime: _endTime,
            isActive: true,
            totalVoters: 0,
            votesCount: 0
        });

        emit VotingSessionCreated(sessionCount, _electionName, _startTime, _endTime);
    }

    /**
     * @dev Toggle voting session active/inactive status
     * @param _sessionId ID of the voting session
     */
    function toggleVotingSession(uint256 _sessionId) public onlyAdmin {
        require(_sessionId > 0 && _sessionId <= sessionCount, "Invalid session ID");
        
        votingSessions[_sessionId].isActive = !votingSessions[_sessionId].isActive;
        emit VotingSessionToggled(_sessionId, votingSessions[_sessionId].isActive);
    }

    /**
     * @dev Toggle system active/inactive status
     */
    function toggleSystem() public onlyAdmin {
        systemActive = !systemActive;
        emit SystemStateChanged(systemActive, block.timestamp);
    }

    /**
     * @dev Remove a voter from the system
     * @param _voterAddress Address of the voter to unregister
     */
    function unregisterVoter(address _voterAddress) public onlyAdmin {
        require(isVoterRegistered[_voterAddress], "Voter is not registered");
        
        string memory voterName = voters[_voterAddress].votersName;
        isVoterRegistered[_voterAddress] = false;
        voters[_voterAddress].isRegistered = false;
        voterCount--;

        emit VoterUnregistered(_voterAddress, voterName);
    }

    // ==================== VOTER REGISTRATION ====================
    
    /**
     * @dev Register a new voter
     * @param _votersName Full name of the voter
     * @param _votersNationality Nationality of the voter
     * @param _votersAge Age of the voter
     * @param _votersLocalGovernmentArea Local government area
     */
    
    function registerVoter(
        string memory _votersName,
        string memory _votersNationality,
        int256 _votersAge,
        string memory _votersLocalGovernmentArea
    ) public systemMustBeActive validVoterAge(_votersAge) {
        require(!isVoterRegistered[msg.sender], "Voter already registered");
        require(bytes(_votersName).length > 0, "Name cannot be empty");
        require(bytes(_votersNationality).length > 0, "Nationality cannot be empty");
        require(bytes(_votersLocalGovernmentArea).length > 0, "LGA cannot be empty");

        voters[msg.sender] = RegisteredVoter({
            votersName: _votersName,
            votersNationality: _votersNationality,
            votersAge: _votersAge,
            votersLocalGovernmentArea: _votersLocalGovernmentArea,
            walletAddress: msg.sender,
            isRegistered: true,
            hasVoted: false,
            candidateVotedFor: 0
        });

        isVoterRegistered[msg.sender] = true;
        voterCount++;

        emit VoterRegistered(msg.sender, _votersName, _votersNationality);
    }

    // ==================== VOTING FUNCTIONS ====================
    
    /**
     * @dev Cast a vote for a candidate
     * @param _candidateId ID of the candidate to vote for
     * @param _sessionId ID of the voting session
     */
    function castVote(uint256 _candidateId, uint256 _sessionId)
        public
        systemMustBeActive
        voterMustBeRegistered
        voterMustNotHaveVoted
        validCandidate(_candidateId)
    {
        require(_sessionId > 0 && _sessionId <= sessionCount, "Invalid session ID");
        require(votingSessions[_sessionId].isActive, "Voting session is not active");
        require(
            block.timestamp >= votingSessions[_sessionId].startTime,
            "Voting has not started"
        );
        require(
            block.timestamp <= votingSessions[_sessionId].endTime,
            "Voting has ended"
        );

        // Record the vote
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].candidateVotedFor = _candidateId;
        candidates[_candidateId].voteCount++;
        votingSessions[_sessionId].votesCount++;

        // Track voter in session
        sessionVoters[_sessionId].push(msg.sender);

        emit VoteCasted(msg.sender, _candidateId, block.timestamp);
    }

    // ==================== VIEW FUNCTIONS ====================
    
    /**
     * @dev Get voter information
     * @param _voterAddress Address of the voter
     * @return Voter details
     */
    function getVoterInfo(address _voterAddress)
        public
        view
        returns (RegisteredVoter memory)
    {
        require(isVoterRegistered[_voterAddress], "Voter not registered");
        return voters[_voterAddress];
    }

    /**
     * @dev Get candidate information
     * @param _candidateId ID of the candidate
     * @return Candidate details
     */
    function getCandidateInfo(uint256 _candidateId)
        public
        view
        validCandidate(_candidateId)
        returns (Candidate memory)
    {
        return candidates[_candidateId];
    }

    /**
     * @dev Get voting session information
     * @param _sessionId ID of the voting session
     * @return Voting session details
     */
    function getVotingSessionInfo(uint256 _sessionId)
        public
        view
        returns (VotingSession memory)
    {
        require(_sessionId > 0 && _sessionId <= sessionCount, "Invalid session ID");
        return votingSessions[_sessionId];
    }

    /**
     * @dev Get total votes for a candidate
     * @param _candidateId ID of the candidate
     * @return Vote count
     */
    function getCandidateVoteCount(uint256 _candidateId)
        public
        view
        validCandidate(_candidateId)
        returns (uint256)
    {
        return candidates[_candidateId].voteCount;
    }

    /**
     * @dev Check if voter has voted
     * @param _voterAddress Address of the voter
     * @return Boolean indicating if voter has voted
     */
    function hasVoterVoted(address _voterAddress)
        public
        view
        returns (bool)
    {
        require(isVoterRegistered[_voterAddress], "Voter not registered");
        return voters[_voterAddress].hasVoted;
    }

    /**
     * @dev Get all session voters
     * @param _sessionId ID of the voting session
     * @return Array of voter addresses
     */
    function getSessionVoters(uint256 _sessionId)
        public
        view
        returns (address[] memory)
    {
        require(_sessionId > 0 && _sessionId <= sessionCount, "Invalid session ID");
        return sessionVoters[_sessionId];
    }

    /**
     * @dev Get voting session results
     * @param _sessionId ID of the voting session
     * @return Array of candidates with vote counts
     */
    function getSessionResults(uint256 _sessionId)
        public
        view
        returns (Candidate[] memory)
    {
        require(_sessionId > 0 && _sessionId <= sessionCount, "Invalid session ID");
        
        Candidate[] memory results = new Candidate[](candidateCount);
        for (uint256 i = 1; i <= candidateCount; i++) {
            results[i - 1] = candidates[i];
        }
        return results;
    }

    /**
     * @dev Get the winning candidate
     * @return Candidate with highest votes
     */
    function getWinningCandidate() public view returns (Candidate memory) {
        require(candidateCount > 0, "No candidates registered");
        
        uint256 maxVotes = 0;
        uint256 winningId = 1;

        for (uint256 i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winningId = i;
            }
        }

        return candidates[winningId];
    }

    /**
     * @dev Get system statistics
     * @return totalCandidates, totalRegisteredVoters, totalVotes, systemActive
     */
    function getSystemStats()
        public
        view
        returns (
            uint256 totalCandidates,
            uint256 totalRegisteredVoters,
            uint256 totalVotes,
            bool isSystemActive
        )
    {
        uint256 totalVotesCount = 0;
        for (uint256 i = 1; i <= candidateCount; i++) {
            totalVotesCount += candidates[i].voteCount;
        }

        return (candidateCount, voterCount, totalVotesCount, systemActive);
    }

    /**
     * @dev Get admin address
     * @return Admin wallet address
     */
    function getAdmin() public view returns (address) {
        return admin;
    }
}
