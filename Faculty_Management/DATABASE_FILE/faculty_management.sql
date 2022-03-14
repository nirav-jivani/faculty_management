-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2022 at 07:14 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `faculty_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Department` varchar(200) NOT NULL,
  `Organization` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `Name`, `Department`, `Organization`) VALUES
(11, 'Vipul K. Dabhi', 'Information Technology', 'Dharmsinh Desai University'),
(13, 'Vimal Matholiya', 'Information Technology', 'Dharmsinh Desai University'),
(14, 'NiravJivani', 'A', 'A'),
(15, 'nirav', 'A', 'DDU'),
(16, 'v', 'Information Technology', 'Dharmsinh Desai University');

-- --------------------------------------------------------

--
-- Table structure for table `conference_authors`
--

CREATE TABLE `conference_authors` (
  `id` int(11) NOT NULL,
  `ConfId` int(11) NOT NULL,
  `AuthId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `conference_authors`
--

INSERT INTO `conference_authors` (`id`, `ConfId`, `AuthId`) VALUES
(12, 21, 13);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `DeptName` varchar(100) NOT NULL,
  `DeptShortName` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `DeptName`, `DeptShortName`) VALUES
(1, 'Computer Engineering', 'CE'),
(2, 'Chemical Engineering', 'CH'),
(3, 'Mechanical Engineering', 'MH'),
(4, 'Information Technology', 'IT'),
(5, 'Civil Engineering ', 'CL'),
(6, 'Electrical Engineering ', 'EC');

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `id` int(11) NOT NULL,
  `Designation` varchar(200) NOT NULL,
  `DesignationShortName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`id`, `Designation`, `DesignationShortName`) VALUES
(2, 'Associative Professor', 'Assoc Prof'),
(3, 'Assistant Professor ', 'Asst Prof'),
(4, 'Professor', 'Prof'),
(5, 'Not Teaching Staff', 'NTS');

-- --------------------------------------------------------

--
-- Table structure for table `event_attended`
--

CREATE TABLE `event_attended` (
  `id` int(11) NOT NULL,
  `FactId` int(11) NOT NULL,
  `EventTitle` varchar(100) NOT NULL,
  `OrganizedBy` varchar(100) NOT NULL,
  `OrganizedAt` varchar(100) NOT NULL,
  `StartDate` varchar(20) NOT NULL,
  `EndDate` varchar(20) NOT NULL,
  `Duration` varchar(20) NOT NULL,
  `SpeakerName` varchar(100) NOT NULL,
  `EventTopic` varchar(100) NOT NULL,
  `EventLevel` varchar(20) NOT NULL,
  `EventType` varchar(100) NOT NULL,
  `OtherType` varchar(100) DEFAULT NULL,
  `EventMode` varchar(20) NOT NULL,
  `AcademicYear` varchar(20) NOT NULL,
  `ApprovedBy` varchar(100) NOT NULL,
  `CertificatePath` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_attended`
--

INSERT INTO `event_attended` (`id`, `FactId`, `EventTitle`, `OrganizedBy`, `OrganizedAt`, `StartDate`, `EndDate`, `Duration`, `SpeakerName`, `EventTopic`, `EventLevel`, `EventType`, `OtherType`, `EventMode`, `AcademicYear`, `ApprovedBy`, `CertificatePath`) VALUES
(1, 15, 'Web Devlopment', 'Microsoft', 'ddu,nadiad', '2022-02-15', '2022-02-15', '3 hr', 'prof. albert', 'Django frame work', 'Local', 'Webinar', '', 'Online', '2022-2023', 'MCAT', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_conducted`
--

CREATE TABLE `event_conducted` (
  `id` int(11) NOT NULL,
  `FactId` int(11) NOT NULL,
  `EventTitle` varchar(100) NOT NULL,
  `OrganizedBy` varchar(100) NOT NULL,
  `ConductedAt` varchar(100) NOT NULL,
  `StartDate` varchar(100) NOT NULL,
  `EndDate` varchar(20) NOT NULL,
  `Duration` varchar(100) NOT NULL,
  `EventTopic` varchar(100) NOT NULL,
  `EventLevel` varchar(100) NOT NULL,
  `EventType` varchar(100) NOT NULL,
  `OtherType` varchar(100) NOT NULL,
  `TotalParticipants` varchar(1000) DEFAULT NULL,
  `EventMode` varchar(100) NOT NULL,
  `AcademicYear` varchar(100) NOT NULL,
  `ApprovedBy` varchar(100) DEFAULT NULL,
  `ProofPath` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_conducted`
--

INSERT INTO `event_conducted` (`id`, `FactId`, `EventTitle`, `OrganizedBy`, `ConductedAt`, `StartDate`, `EndDate`, `Duration`, `EventTopic`, `EventLevel`, `EventType`, `OtherType`, `TotalParticipants`, `EventMode`, `AcademicYear`, `ApprovedBy`, `ProofPath`) VALUES
(5, 16, 'Frame work', 'Google', 'PDPU', '2022-02-24', '2022-02-24', '4', 'django', 'Local', 'FDP', '', '120', 'Online', '2022-2023', 'IIIT', '');

-- --------------------------------------------------------

--
-- Table structure for table `event_organized`
--

CREATE TABLE `event_organized` (
  `id` int(11) NOT NULL,
  `FactId` int(11) NOT NULL,
  `OrganizedUnder` varchar(200) DEFAULT NULL,
  `OrganizedAt` varchar(200) DEFAULT NULL,
  `EventTitle` varchar(200) NOT NULL,
  `EventTopic` varchar(200) DEFAULT NULL,
  `SpeakerName` varchar(200) NOT NULL,
  `StartDate` varchar(200) NOT NULL,
  `EndDate` varchar(20) NOT NULL,
  `Duration` varchar(200) NOT NULL,
  `EventType` varchar(200) NOT NULL,
  `OtherType` varchar(200) NOT NULL,
  `EventLevel` varchar(100) NOT NULL,
  `EventMode` varchar(200) NOT NULL,
  `TotalParticipants` varchar(2000) DEFAULT NULL,
  `AcademicYear` varchar(200) NOT NULL,
  `ApprovedBy` varchar(200) NOT NULL,
  `ProofPath` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_organized`
--

INSERT INTO `event_organized` (`id`, `FactId`, `OrganizedUnder`, `OrganizedAt`, `EventTitle`, `EventTopic`, `SpeakerName`, `StartDate`, `EndDate`, `Duration`, `EventType`, `OtherType`, `EventLevel`, `EventMode`, `TotalParticipants`, `AcademicYear`, `ApprovedBy`, `ProofPath`) VALUES
(2, 16, NULL, NULL, 'Competitive  Coding', 'C#', 'jenit nakrani', '2022-02-24', '2022-02-24', '1', 'Seminar', '', 'International', 'Offline', '120', '2012-2013', 'MCAT', '');

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

CREATE TABLE `faculties` (
  `id` int(20) NOT NULL,
  `Username` varchar(200) NOT NULL,
  `Password` varchar(500) NOT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `MiddleName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `BirthDate` varchar(100) DEFAULT NULL,
  `JoinDate` varchar(100) NOT NULL,
  `Qualification` varchar(50) DEFAULT NULL,
  `LeaveDate` varchar(100) DEFAULT NULL,
  `Working` tinyint(1) NOT NULL DEFAULT 1,
  `Gender` varchar(20) DEFAULT NULL,
  `DesignationId` int(11) DEFAULT NULL,
  `DeptId` int(20) NOT NULL,
  `YearOfExperience` varchar(11) DEFAULT NULL,
  `Initial` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faculties`
--

INSERT INTO `faculties` (`id`, `Username`, `Password`, `FirstName`, `MiddleName`, `LastName`, `BirthDate`, `JoinDate`, `Qualification`, `LeaveDate`, `Working`, `Gender`, `DesignationId`, `DeptId`, `YearOfExperience`, `Initial`) VALUES
(1, 'admin@gmail.com', '$2a$10$Zax1RG60gOvlzvHizJ.tF.MMD0Z2GQurvU6sSVLx4hrB6IS/e5ebq', 'Robert', '', 'Downey', NULL, '2022-01-12', NULL, NULL, 1, NULL, 2, 1, NULL, NULL),
(15, 'jenitnakrani12@gmail.com', '$2a$10$bHK9KXQjd6P2AFzqXVmxrutd2LFzb/ukbUWJzMCj3rSq6QSQmaDr6', 'Jenit', 'Baldevbhai', 'Nakrani', '2000-01-11', '2022-02-13', 'Bsc', NULL, 0, 'Male', 5, 1, '1', NULL),
(16, 'niravjivani3@gmail.com', '$2a$10$xeEscPcUwmQB8kw.GuUbBekzMF2PlxxihQRFZggfaKKzT.xfk9O6m', 'Nirav', NULL, 'Jivani', '2002-05-06', '2022-02-18', 'B.Tech', NULL, 1, 'Male', 2, 1, '11', NULL),
(19, 'vimalmatholiya175@gmail.com', '$2a$10$MKLbhg.Pc/YVO9pYDkHfcOGtXXlZeTPmMDxYj1S5z78lEZGv8M3re', 'Vimal', NULL, 'Matholiya', NULL, '2022-02-19', NULL, NULL, 1, NULL, 2, 3, NULL, NULL),
(20, 'jenitnakrani123@gmail.com', '$2a$10$AELP9R/Rnaf3pDo4h/6KSOUnR1oYAy.lM5dw8rkWt0EcudVqVLLVO', 'Jenit', NULL, 'Nakrani', NULL, '2022-02-22', NULL, NULL, 1, NULL, 3, 2, NULL, NULL),
(25, '19ceuos232@ddu.ac.in', '$2a$10$ISjGNq5O60TJnzEdG3wPxOrO2KYqwl.dkf2LlYFvNpviT0aLXeU6G', 'NIRAV', NULL, 'JIVANI', NULL, '2022-03-03', NULL, NULL, 1, NULL, 2, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `faculty_roles`
--

CREATE TABLE `faculty_roles` (
  `id` int(11) NOT NULL,
  `FactId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faculty_roles`
--

INSERT INTO `faculty_roles` (`id`, `FactId`, `RoleId`) VALUES
(1, 1, 1),
(7, 15, 2),
(8, 25, 2),
(12, 19, 2),
(13, 19, 3),
(19, 20, 2),
(37, 16, 2),
(38, 16, 4);

-- --------------------------------------------------------

--
-- Table structure for table `journal_authors`
--

CREATE TABLE `journal_authors` (
  `id` int(11) NOT NULL,
  `JournalId` int(11) NOT NULL,
  `AuthId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `journal_authors`
--

INSERT INTO `journal_authors` (`id`, `JournalId`, `AuthId`) VALUES
(5, 2, 13),
(6, 2, 11);

-- --------------------------------------------------------

--
-- Table structure for table `research_conferences`
--

CREATE TABLE `research_conferences` (
  `id` int(11) NOT NULL,
  `FactId` int(11) NOT NULL,
  `ResearchTitle` varchar(200) NOT NULL,
  `Level` varchar(200) NOT NULL,
  `ConferenceTitle` varchar(200) NOT NULL,
  `StartDate` varchar(200) NOT NULL,
  `EndDate` varchar(200) NOT NULL,
  `ConferenceName` varchar(200) DEFAULT NULL,
  `Organizer` varchar(200) DEFAULT NULL,
  `City` varchar(200) DEFAULT NULL,
  `State` varchar(200) DEFAULT NULL,
  `Country` varchar(200) DEFAULT NULL,
  `Publisher` varchar(200) NOT NULL,
  `PublicationDate` varchar(200) NOT NULL,
  `Pages` varchar(200) DEFAULT NULL,
  `DOI` varchar(200) DEFAULT NULL,
  `ISBN` varchar(200) DEFAULT NULL,
  `AffiliatingInstitute` varchar(200) DEFAULT NULL,
  `AcademicYear` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `research_conferences`
--

INSERT INTO `research_conferences` (`id`, `FactId`, `ResearchTitle`, `Level`, `ConferenceTitle`, `StartDate`, `EndDate`, `ConferenceName`, `Organizer`, `City`, `State`, `Country`, `Publisher`, `PublicationDate`, `Pages`, `DOI`, `ISBN`, `AffiliatingInstitute`, `AcademicYear`) VALUES
(21, 16, 'On Pilot Contamination in Massive MIMO System', 'International', 'International Conference on Intelligent Systems and Signal Processing . (ISSP-2017)', '2022-03-13', '2022-03-17', '21st International Symposium on VLSI Design and Test', 'IIT Roorkee', 'Roorkee', 'Uttrakhand', 'India', 'Springer', '2022-03-13', '103-110', '10.1002/dac.4200', '978-981-10-7470-7', 'Dharmsinh Desai University', '2016-2017');

-- --------------------------------------------------------

--
-- Table structure for table `research_journals`
--

CREATE TABLE `research_journals` (
  `id` int(11) NOT NULL,
  `FactId` int(11) NOT NULL,
  `AcademicYear` varchar(200) NOT NULL,
  `ResearchTitle` varchar(200) NOT NULL,
  `JournalTitle` varchar(100) NOT NULL,
  `Level` varchar(45) NOT NULL,
  `Publisher` varchar(200) NOT NULL,
  `Link` varchar(300) DEFAULT NULL,
  `PublicationDate` date NOT NULL,
  `VolumeNo` varchar(45) DEFAULT NULL,
  `PublicationNo` varchar(45) DEFAULT NULL,
  `Pages` varchar(200) DEFAULT NULL,
  `DOI` varchar(200) DEFAULT NULL,
  `ISBN` varchar(200) DEFAULT NULL,
  `ImpactFactor` varchar(200) DEFAULT NULL,
  `ImpactFactorYear` varchar(10) DEFAULT NULL,
  `ImpactFactorAgency` varchar(200) DEFAULT NULL,
  `HIndex` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `research_journals`
--

INSERT INTO `research_journals` (`id`, `FactId`, `AcademicYear`, `ResearchTitle`, `JournalTitle`, `Level`, `Publisher`, `Link`, `PublicationDate`, `VolumeNo`, `PublicationNo`, `Pages`, `DOI`, `ISBN`, `ImpactFactor`, `ImpactFactorYear`, `ImpactFactorAgency`, `HIndex`) VALUES
(2, 16, '2016-2017', 'Recent Trends in Machine Learning-based Protein Fold Recognition Methods', 'International Journal of Communication Systems', 'International', 'Willey', 'https://www.youtube.com/watch?v=gY5sGvq-8h8', '2022-03-09', '33', '3', '103-110', '10.1002/dac.4200', '1099-1131', '2.289', '2010', 'Clarivate Analytics', '49');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `RoleName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `RoleName`) VALUES
(1, 'Admin'),
(2, 'Faculty'),
(3, 'SubjectAllocationAdmin'),
(4, 'FacultyManagementAdmin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conference_authors`
--
ALTER TABLE `conference_authors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ConfId` (`ConfId`),
  ADD KEY `AuthId` (`AuthId`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_attended`
--
ALTER TABLE `event_attended`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attend_fk` (`FactId`);

--
-- Indexes for table `event_conducted`
--
ALTER TABLE `event_conducted`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conduct_fk` (`FactId`);

--
-- Indexes for table `event_organized`
--
ALTER TABLE `event_organized`
  ADD PRIMARY KEY (`id`),
  ADD KEY `organized_fk` (`FactId`);

--
-- Indexes for table `faculties`
--
ALTER TABLE `faculties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dept_fk` (`DeptId`),
  ADD KEY `employees_ibfk_1` (`DesignationId`);

--
-- Indexes for table `faculty_roles`
--
ALTER TABLE `faculty_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FactId` (`FactId`),
  ADD KEY `RoleId` (`RoleId`);

--
-- Indexes for table `journal_authors`
--
ALTER TABLE `journal_authors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JournalId` (`JournalId`),
  ADD KEY `AuthId` (`AuthId`);

--
-- Indexes for table `research_conferences`
--
ALTER TABLE `research_conferences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FactId` (`FactId`);

--
-- Indexes for table `research_journals`
--
ALTER TABLE `research_journals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FactId` (`FactId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `conference_authors`
--
ALTER TABLE `conference_authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `event_attended`
--
ALTER TABLE `event_attended`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `event_conducted`
--
ALTER TABLE `event_conducted`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `event_organized`
--
ALTER TABLE `event_organized`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `faculties`
--
ALTER TABLE `faculties`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `faculty_roles`
--
ALTER TABLE `faculty_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `journal_authors`
--
ALTER TABLE `journal_authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `research_conferences`
--
ALTER TABLE `research_conferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `research_journals`
--
ALTER TABLE `research_journals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conference_authors`
--
ALTER TABLE `conference_authors`
  ADD CONSTRAINT `conference_authors_ibfk_1` FOREIGN KEY (`ConfId`) REFERENCES `research_conferences` (`id`),
  ADD CONSTRAINT `conference_authors_ibfk_2` FOREIGN KEY (`AuthId`) REFERENCES `authors` (`id`);

--
-- Constraints for table `event_attended`
--
ALTER TABLE `event_attended`
  ADD CONSTRAINT `attend_fk` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`);

--
-- Constraints for table `event_conducted`
--
ALTER TABLE `event_conducted`
  ADD CONSTRAINT `conduct_fk` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`);

--
-- Constraints for table `event_organized`
--
ALTER TABLE `event_organized`
  ADD CONSTRAINT `organized_fk` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`);

--
-- Constraints for table `faculties`
--
ALTER TABLE `faculties`
  ADD CONSTRAINT `dept_fk` FOREIGN KEY (`DeptId`) REFERENCES `departments` (`id`),
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`DesignationId`) REFERENCES `designations` (`id`);

--
-- Constraints for table `faculty_roles`
--
ALTER TABLE `faculty_roles`
  ADD CONSTRAINT `faculty_roles_ibfk_1` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`),
  ADD CONSTRAINT `faculty_roles_ibfk_2` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`id`);

--
-- Constraints for table `journal_authors`
--
ALTER TABLE `journal_authors`
  ADD CONSTRAINT `journal_authors_ibfk_1` FOREIGN KEY (`JournalId`) REFERENCES `research_journals` (`id`),
  ADD CONSTRAINT `journal_authors_ibfk_2` FOREIGN KEY (`AuthId`) REFERENCES `authors` (`id`);

--
-- Constraints for table `research_conferences`
--
ALTER TABLE `research_conferences`
  ADD CONSTRAINT `research_conferences_ibfk_1` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`);

--
-- Constraints for table `research_journals`
--
ALTER TABLE `research_journals`
  ADD CONSTRAINT `research_journals_ibfk_1` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
