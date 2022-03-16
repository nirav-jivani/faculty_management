-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: faculty_management
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `Department` varchar(200) NOT NULL,
  `Organization` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (11,'Vipul K. Dabhi','Information Technology','Dharmsinh Desai University'),(13,'Vimal Matholiya','Information Technology','Dharmsinh Desai University'),(14,'NiravJivani','A','A'),(15,'nirav','A','DDU'),(16,'v','Information Technology','Dharmsinh Desai University');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference_authors`
--

DROP TABLE IF EXISTS `conference_authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference_authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ConfId` int NOT NULL,
  `AuthId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ConfId` (`ConfId`),
  KEY `AuthId` (`AuthId`),
  CONSTRAINT `conference_authors_ibfk_1` FOREIGN KEY (`ConfId`) REFERENCES `research_conferences` (`id`),
  CONSTRAINT `conference_authors_ibfk_2` FOREIGN KEY (`AuthId`) REFERENCES `authors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_authors`
--

LOCK TABLES `conference_authors` WRITE;
/*!40000 ALTER TABLE `conference_authors` DISABLE KEYS */;
INSERT INTO `conference_authors` VALUES (12,21,13);
/*!40000 ALTER TABLE `conference_authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `DeptName` varchar(100) NOT NULL,
  `DeptShortName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Computer Engineering','CE'),(2,'Chemical Engineering','CH'),(3,'Mechanical Engineering','MH'),(4,'Information Technology','IT'),(5,'Civil Engineering ','CL'),(6,'Electrical Engineering ','EC');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designations`
--

DROP TABLE IF EXISTS `designations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Designation` varchar(200) NOT NULL,
  `DesignationShortName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designations`
--

LOCK TABLES `designations` WRITE;
/*!40000 ALTER TABLE `designations` DISABLE KEYS */;
INSERT INTO `designations` VALUES (2,'Associative Professor','Assoc Prof'),(3,'Assistant Professor ','Asst Prof'),(4,'Professor','Prof'),(5,'Not Teaching Staff','NTS');
/*!40000 ALTER TABLE `designations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_attended`
--

DROP TABLE IF EXISTS `event_attended`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_attended` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FactId` int NOT NULL,
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
  `CertificatePath` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attend_fk` (`FactId`),
  CONSTRAINT `attend_fk` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_attended`
--

LOCK TABLES `event_attended` WRITE;
/*!40000 ALTER TABLE `event_attended` DISABLE KEYS */;
INSERT INTO `event_attended` VALUES (1,15,'Web Devlopment','Microsoft','ddu,nadiad','2022-02-15','2022-02-15','3 hr','prof. albert','Django frame work','Local','Webinar','','Online','2022-2023','MCAT',NULL),(5,19,'Cultural Event','Darsh Vaghela','Ddu, Nadiad','2022-03-16','2022-03-17','2','Shani Patel','Still figuring out.....','Local','AnyOther','Extra Curricular','Offline','2022-2023','Gopal Malaviya','NISLAB9_Wed_Mar_16_2022_9_24_52_pm.pdf');
/*!40000 ALTER TABLE `event_attended` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_conducted`
--

DROP TABLE IF EXISTS `event_conducted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_conducted` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FactId` int NOT NULL,
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
  `ProofPath` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `conduct_fk` (`FactId`),
  CONSTRAINT `conduct_fk` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_conducted`
--

LOCK TABLES `event_conducted` WRITE;
/*!40000 ALTER TABLE `event_conducted` DISABLE KEYS */;
INSERT INTO `event_conducted` VALUES (5,16,'Frame work','Google','PDPU','2022-02-24','2022-02-24','4','django','Local','FDP','','120','Online','2022-2023','IIIT','');
/*!40000 ALTER TABLE `event_conducted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_organized`
--

DROP TABLE IF EXISTS `event_organized`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_organized` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FactId` int NOT NULL,
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
  `ProofPath` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `organized_fk` (`FactId`),
  CONSTRAINT `organized_fk` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_organized`
--

LOCK TABLES `event_organized` WRITE;
/*!40000 ALTER TABLE `event_organized` DISABLE KEYS */;
INSERT INTO `event_organized` VALUES (2,16,NULL,NULL,'Competitive  Coding','C#','jenit nakrani','2022-02-24','2022-02-24','1','Seminar','','International','Offline','120','2012-2013','MCAT','');
/*!40000 ALTER TABLE `event_organized` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculties`
--

DROP TABLE IF EXISTS `faculties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(200) NOT NULL,
  `Password` varchar(500) NOT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `MiddleName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `BirthDate` varchar(100) DEFAULT NULL,
  `JoinDate` varchar(100) NOT NULL,
  `Qualification` varchar(50) DEFAULT NULL,
  `LeaveDate` varchar(100) DEFAULT NULL,
  `Working` tinyint(1) NOT NULL DEFAULT '1',
  `Gender` varchar(20) DEFAULT NULL,
  `DesignationId` int DEFAULT NULL,
  `DeptId` int NOT NULL,
  `YearOfExperience` varchar(11) DEFAULT NULL,
  `Initials` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dept_fk` (`DeptId`),
  KEY `employees_ibfk_1` (`DesignationId`),
  CONSTRAINT `dept_fk` FOREIGN KEY (`DeptId`) REFERENCES `departments` (`id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`DesignationId`) REFERENCES `designations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculties`
--

LOCK TABLES `faculties` WRITE;
/*!40000 ALTER TABLE `faculties` DISABLE KEYS */;
INSERT INTO `faculties` VALUES (1,'admin@gmail.com','$2a$10$Zax1RG60gOvlzvHizJ.tF.MMD0Z2GQurvU6sSVLx4hrB6IS/e5ebq','Robert','','Downey',NULL,'2022-01-12',NULL,NULL,1,NULL,2,1,NULL,NULL),(15,'jenitnakrani12@gmail.com','$2a$10$bHK9KXQjd6P2AFzqXVmxrutd2LFzb/ukbUWJzMCj3rSq6QSQmaDr6','Jenit','Baldevbhai','Nakrani','2000-01-11','2022-02-13','Bsc',NULL,0,'Male',5,1,'1',NULL),(16,'niravjivani3@gmail.com','$2a$10$xeEscPcUwmQB8kw.GuUbBekzMF2PlxxihQRFZggfaKKzT.xfk9O6m','Nirav',NULL,'Jivani','2002-05-06','2022-02-18','B.Tech',NULL,1,'Male',2,1,'11','NDJ'),(19,'vimalmatholiya175@gmail.com','$2a$10$k.J3LJAS35h8K98edGGiBusztuQkudVxpVcLEyPhxhcJ.T0Xwij.y','Vimal','Vallabhbhai','Matholiya','2001-10-07','2022-02-19','B.Tech',NULL,1,'Male',2,3,'3',NULL),(20,'jenitnakrani123@gmail.com','$2a$10$AELP9R/Rnaf3pDo4h/6KSOUnR1oYAy.lM5dw8rkWt0EcudVqVLLVO','Jenit',NULL,'Nakrani',NULL,'2022-02-22',NULL,NULL,1,NULL,3,2,NULL,'JBN'),(25,'19ceuos232@ddu.ac.in','$2a$10$ISjGNq5O60TJnzEdG3wPxOrO2KYqwl.dkf2LlYFvNpviT0aLXeU6G','NIRAV',NULL,'JIVANI',NULL,'2022-03-03',NULL,NULL,1,NULL,2,2,NULL,NULL);
/*!40000 ALTER TABLE `faculties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty_roles`
--

DROP TABLE IF EXISTS `faculty_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FactId` int NOT NULL,
  `RoleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FactId` (`FactId`),
  KEY `RoleId` (`RoleId`),
  CONSTRAINT `faculty_roles_ibfk_1` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`),
  CONSTRAINT `faculty_roles_ibfk_2` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty_roles`
--

LOCK TABLES `faculty_roles` WRITE;
/*!40000 ALTER TABLE `faculty_roles` DISABLE KEYS */;
INSERT INTO `faculty_roles` VALUES (1,1,1),(7,15,2),(8,25,2),(12,19,1),(13,19,3),(37,16,2),(38,16,4),(39,20,2);
/*!40000 ALTER TABLE `faculty_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journal_authors`
--

DROP TABLE IF EXISTS `journal_authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal_authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `JournalId` int NOT NULL,
  `AuthId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `JournalId` (`JournalId`),
  KEY `AuthId` (`AuthId`),
  CONSTRAINT `journal_authors_ibfk_1` FOREIGN KEY (`JournalId`) REFERENCES `research_journals` (`id`),
  CONSTRAINT `journal_authors_ibfk_2` FOREIGN KEY (`AuthId`) REFERENCES `authors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journal_authors`
--

LOCK TABLES `journal_authors` WRITE;
/*!40000 ALTER TABLE `journal_authors` DISABLE KEYS */;
INSERT INTO `journal_authors` VALUES (5,2,13),(6,2,11);
/*!40000 ALTER TABLE `journal_authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research_conferences`
--

DROP TABLE IF EXISTS `research_conferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research_conferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FactId` int NOT NULL,
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
  `AcademicYear` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FactId` (`FactId`),
  CONSTRAINT `research_conferences_ibfk_1` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research_conferences`
--

LOCK TABLES `research_conferences` WRITE;
/*!40000 ALTER TABLE `research_conferences` DISABLE KEYS */;
INSERT INTO `research_conferences` VALUES (21,19,'On Pilot Contamination in Massive MIMO System','International','International Conference on Intelligent Systems and Signal Processing . (ISSP-2017)','2022-03-13','2022-03-17','21st International Symposium on VLSI Design and Test','IIT Roorkee','Roorkee','Uttrakhand','India','Springer','2022-03-13','103-110','10.1002/dac.4200','978-981-10-7470-7','Dharmsinh Desai University','2016-2017');
/*!40000 ALTER TABLE `research_conferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research_journals`
--

DROP TABLE IF EXISTS `research_journals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research_journals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FactId` int NOT NULL,
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
  `HIndex` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FactId` (`FactId`),
  CONSTRAINT `research_journals_ibfk_1` FOREIGN KEY (`FactId`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research_journals`
--

LOCK TABLES `research_journals` WRITE;
/*!40000 ALTER TABLE `research_journals` DISABLE KEYS */;
INSERT INTO `research_journals` VALUES (2,19,'2016-2017','Recent Trends in Machine Learning-based Protein Fold Recognition Methods','International Journal of Communication Systems','International','Willey','https://www.youtube.com/watch?v=gY5sGvq-8h8','2022-03-09','33','3','103-110','10.1002/dac.4200','1099-1131','2.289','2010','Clarivate Analytics','49');
/*!40000 ALTER TABLE `research_journals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'Faculty'),(3,'SubjectAllocationAdmin'),(4,'FacultyManagementAdmin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-16 23:46:31
