-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: final-project
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `final-project`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `final-project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `final-project`;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `courseId` varchar(10) NOT NULL,
  `courseName` varchar(200) NOT NULL,
  `capacity` int NOT NULL DEFAULT '40',
  PRIMARY KEY (`courseId`),
  UNIQUE KEY `courseId_UNIQUE` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('CSE101','Computer Science Principles',39),('CSE114','Introduction to Object-Oriented Programming',39),('CSE214','Data Structures',37),('CSE215',' Foundations of Computer Science',38),('CSE216','Programming Abstractions',39),('CSE220','System Fundamentals I',40),('CSE230','Intermediate Programming in C and C++',40),('CSE300',' Technical Communications',39),('CSE301','History of Computing',40),('CSE303','Introduction to the Theory of Computation I',39),('CSE304','Compiler Design',40),('CSE305',' Principles of Database Systems',39),('CSE306','Operating Systems',40),('CSE307','Principles of Programming Languages',40),('CSE310',' Computer Networks',39),('CSE311','Systems Administration',39),('CSE312','Legal, Social, and Ethical Issues in Information Systems',40),('CSE316','Fundamentals of Software Development',40),('CSE320',' Systems Fundamentals II',40),('CSE323','Human-Computer Interaction',40),('CSE327','Fundamentals of Computer Vision',40),('CSE328','Fundamentals of Computer Graphics',40),('CSE331',' Computer Security Fundamentals',40),('CSE332','Introduction to Visualization',40),('CSE333','User Interface Development',40),('CSE336','Internet Programming',40),('CSE346',' Computer Communications',40),('CSE351','Introduction to Data Science',40),('CSE352','Artificial Intelligence',40),('CSE353','Machine Learning',40),('CSE364',' Advanced Multimedia Techniques',40),('CSE366','Introduction to Virtual Reality',39),('CSE370','Wireless and Mobile Networking',40),('CSE371','Logic',40),('CSE373','Analysis of Algorithms',40),('CSE377','Introduction to Medical Imaging',40),('CSE378','Introduction to Robotics',40),('CSE380','2D Game Programming',40),('CSE390','Special Topics in Computer Science',40),('CSE416','Software Engineering',40),('CSE475','Undergraduate Teaching Practicum',40),('CSE487','Research in Computer Science',40),('CSE488','Internship in Computer Science',40);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prerequisites`
--

DROP TABLE IF EXISTS `prerequisites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prerequisites` (
  `prerequisiteId` int NOT NULL AUTO_INCREMENT,
  `courseId` varchar(10) NOT NULL,
  `requiredCourseId` varchar(10) NOT NULL,
  PRIMARY KEY (`prerequisiteId`),
  UNIQUE KEY `prerequisiteId_UNIQUE` (`prerequisiteId`),
  UNIQUE KEY `unique_prerequisite` (`courseId`,`requiredCourseId`),
  KEY `requiredCourseId_idx` (`requiredCourseId`),
  CONSTRAINT `courseId` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`),
  CONSTRAINT `requiredCourseId` FOREIGN KEY (`requiredCourseId`) REFERENCES `courses` (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prerequisites`
--

LOCK TABLES `prerequisites` WRITE;
/*!40000 ALTER TABLE `prerequisites` DISABLE KEYS */;
INSERT INTO `prerequisites` VALUES (15,'CSE114','CSE101'),(1,'CSE214','CSE114'),(16,'CSE216','CSE214'),(17,'CSE220','CSE214'),(18,'CSE230','CSE220'),(19,'CSE303','CSE214'),(20,'CSE303','CSE215'),(21,'CSE304','CSE216'),(22,'CSE304','CSE220'),(23,'CSE305','CSE216'),(24,'CSE306','CSE216'),(25,'CSE306','CSE320'),(26,'CSE307','CSE216'),(27,'CSE307','CSE220'),(39,'CSE320','CSE220'),(28,'CSE380','CSE216');
/*!40000 ALTER TABLE `prerequisites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `studentId` int NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`studentId`),
  UNIQUE KEY `studentId_UNIQUE` (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (123456789,'Harry','Chung','e38804c45d255359322d3a3c9d58522fe0528e87784b6724fca79dd67b891dd'),(234567891,'Matt','Lee','124f7d9cfb7da14c498781ff49752edf89cb08574cb19785aaa2a7b4722f5ed'),(345678912,'SUE','Park','13a0461de73c38bf3aa73ccd4f207170cf1dece6300c9fc0248a9e0d70cb995a'),(999999999,'John','Doe','randomtest');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transcripts`
--

DROP TABLE IF EXISTS `transcripts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transcripts` (
  `transcriptId` int NOT NULL AUTO_INCREMENT,
  `studentId` int NOT NULL,
  `courseId` varchar(10) NOT NULL,
  PRIMARY KEY (`transcriptId`),
  UNIQUE KEY `transcriptId_UNIQUE` (`transcriptId`),
  UNIQUE KEY `student_course_unique` (`studentId`,`courseId`),
  KEY `studentId_idx` (`studentId`),
  KEY `courseIdTranscript_idx` (`courseId`),
  CONSTRAINT `courseIdTranscript` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`),
  CONSTRAINT `studentId` FOREIGN KEY (`studentId`) REFERENCES `students` (`studentId`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transcripts`
--

LOCK TABLES `transcripts` WRITE;
/*!40000 ALTER TABLE `transcripts` DISABLE KEYS */;
INSERT INTO `transcripts` VALUES (152,234567891,'CSE101'),(153,234567891,'CSE114'),(154,234567891,'CSE214'),(157,234567891,'CSE215'),(156,234567891,'CSE216');
/*!40000 ALTER TABLE `transcripts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05  3:46:05
