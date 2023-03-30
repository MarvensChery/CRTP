USE [CRTPEquipe3]
GO
/****** Object:  Table [dbo].[CategoriesCrime]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [CategoriesCrime](
	[IdCategorieCrime] [int] IDENTITY(1,1) NOT NULL,
	[Categorie] [nvarchar](75) NOT NULL,
 CONSTRAINT [PK_CategoriesCrime] PRIMARY KEY CLUSTERED 
(
	[IdCategorieCrime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Conditions]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [Conditions](
	[IdCondition] [int] IDENTITY(1,1) NOT NULL,
	[IdIPPE] [int] NOT NULL,
	[IdPersonne] [int] NULL,
	[Libelle] [nvarchar](150) NOT NULL,
	[HeureDebut] [time](7) NULL,
	[HeureFin] [time](7) NULL,
	[Victime] [nvarchar](100) NULL,
	[Frequentation] [nvarchar](100) NULL,
 CONSTRAINT [PK_Conditions] PRIMARY KEY CLUSTERED 
(
	[IdCondition] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Crimes]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [Crimes](
	[IdCrime] [int] IDENTITY(1,1) NOT NULL,
	[IdCategorieCrime] [int] NOT NULL,
	[Nature] [nvarchar](75) NOT NULL,
 CONSTRAINT [PK_Crimes] PRIMARY KEY CLUSTERED 
(
	[IdCrime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[FPS]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO  
CREATE TABLE [FPS](
	[IdFPS] [int] IDENTITY(1,1) NOT NULL,
	[IdPersonne] [int] NOT NULL,
	[NoFPS] [nchar](7) NOT NULL,
	[DateMesure] [datetime] NOT NULL,
	[CD] [nvarchar](50) NOT NULL,
	[Violent] [bit] NULL,
	[Echappe] [bit] NULL,
	[Suicidaire] [bit] NULL,
	[Desequilibre] [bit] NULL,
	[Contagieux] [bit] NULL,
	[Violence] [bit] NOT NULL,
	[Fraude] [bit] NOT NULL,
	[ConduiteVehicule] [bit] NOT NULL,
	[IntroEffraction] [bit] NOT NULL,
	[Sexe] [bit] NOT NULL,
	[ArmeOffensive] [bit] NOT NULL,
	[Vol] [bit] NOT NULL,
	[Drogue] [bit] NOT NULL,
	[Mefait] [bit] NOT NULL,
	[Incendie] [bit] NOT NULL,
	[AutreInfraction] [bit] NOT NULL,
 CONSTRAINT [PK_FPS] PRIMARY KEY CLUSTERED 
(
	[IdFPS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[IBAF]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [IBAF](
	[IdIBAF] [int] IDENTITY(1,1) NOT NULL,
	[NoSerie] [nvarchar](15) NOT NULL,
	[Marque] [nvarchar](50) NOT NULL,
	[Calibre] [nvarchar](10) NULL,
	[TypeArme] [nvarchar](15) NOT NULL,
	[NoEvenement] [nchar](15) NULL,
 CONSTRAINT [PK_IBAB] PRIMARY KEY CLUSTERED 
(
	[IdIBAF] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[IBOB]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [IBOB](
	[IdIBOB] [int] IDENTITY(1,1) NOT NULL,
	[NoSerie] [nvarchar](15) NOT NULL,
	[Marque] [nvarchar](50) NOT NULL,
	[Modele] [nvarchar](50) NULL,
	[TypeObjet] [nvarchar](150) NOT NULL,
	[NoEvenement] [nchar](15) NULL,
 CONSTRAINT [PK_IBOB] PRIMARY KEY CLUSTERED 
(
	[IdIBOB] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[IBVA]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [IBVA](
	[IdIBVA] [int] IDENTITY(1,1) NOT NULL,
	[Identifiant] [nvarchar](30) NOT NULL,
	[Auteur] [nvarchar](50) NOT NULL,
	[TypeValeur] [nvarchar](30) NOT NULL,
	[TypeEvenement] [nvarchar](30) NULL,
	[NoEvenement] [nchar](15) NULL,
 CONSTRAINT [PK_IBVA] PRIMARY KEY CLUSTERED 
(
	[IdIBVA] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[IPPE]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [IPPE](
	[IdIPPE] [int] IDENTITY(1,1) NOT NULL,
	[NoEvenement] [nchar](15) NOT NULL,
	[TypeEvenement] [nvarchar](30) NOT NULL,
	[Mandat] [nvarchar](100) NULL,
	[Motif] [nvarchar](100) NULL,
	[Nature] [nvarchar](100) NULL,
	[DossierEnquete] [nchar](15) NULL,
	[Cour] [nvarchar](50) NULL,
	[NoMandat] [nvarchar](20) NULL,
	[NoCause] [nvarchar](20) NULL,
	[IdNatureCrime] [int] NULL,
	[LieuDetention] [nvarchar](30) NULL,
	[FinSentence] [datetime] NULL,
	[VuDerniereFois] [nvarchar](100) NULL,
	[AgentProbation] [nvarchar](150) NULL,
	[AgentLiberation] [nvarchar](150) NULL,
	[Telephone] [nchar](10) NULL,
	[Poste] [nvarchar](6) NULL,
 CONSTRAINT [PK_IPPE] PRIMARY KEY CLUSTERED 
(
	[IdIPPE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Personnes]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [Personnes](
	[IdPersonne] [int] IDENTITY(1,1) NOT NULL,
	[TypePersonne] [nvarchar](15) NOT NULL,
	[NomFamille] [nvarchar](50) NOT NULL,
	[Prenom1] [nvarchar](50) NOT NULL,
	[Prenom2] [nvarchar](50) NULL,
	[Masculin] [bit] NOT NULL,
	[DateNaissance] [datetime] NOT NULL,
	[Telephone] [nchar](10) NULL,
	[NoPermis] [nchar](13) NULL,
	[Adresse1] [nvarchar](50) NULL,
	[Adresse2] [nvarchar](50) NULL,
	[Ville] [nvarchar](50) NULL,
	[Province] [nvarchar](50) NULL,
	[CodePostal] [nchar](7) NULL,
	[Race] [nvarchar](10) NULL,
	[Taille] [int] NULL,
	[Poids] [int] NULL,
	[Yeux] [nvarchar](15) NULL,
	[Cheveux] [nvarchar](15) NULL,
	[Marques] [nvarchar](100) NULL,
	[Toxicomanie] [bit] NULL,
	[Desorganise] [bit] NULL,
	[Depressif] [bit] NULL,
	[Suicidaire] [bit] NULL,
	[Violent] [bit] NULL,
	[Gilet] [nvarchar](50) NULL,
	[Pantalon] [nvarchar](50) NULL,
	[AutreVetement] [nvarchar](50) NULL,
 CONSTRAINT [PK_Personnes] PRIMARY KEY CLUSTERED 
(
	[IdPersonne] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PersonnesIPPE]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [PersonnesIPPE](
	[IdPersonne] [int] NOT NULL,
	[IdIPPE] [int] NOT NULL,
 CONSTRAINT [PK_PersonnesIPPE] PRIMARY KEY CLUSTERED 
(
	[IdPersonne] ASC,
	[IdIPPE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Utilisateurs]    Script Date: 07/03/2023 12:37:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO 
CREATE TABLE [Utilisateurs](
	[IdUtilisateur] [int] IDENTITY(1,1) NOT NULL,
	[Identifiant] [nvarchar](8) NOT NULL,
	[MotDePasse] [nvarchar](max) NOT NULL,
	[Etudiant] [bit] NOT NULL,
	[IdPersonne] [int] NOT NULL,
 CONSTRAINT [PK_Utilisateurs] PRIMARY KEY CLUSTERED 
(
	[IdUtilisateur] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [CategoriesCrime] ON 

GO
INSERT [CategoriesCrime] ([IdCategorieCrime], [Categorie]) VALUES (1, N'Crimes contre la personne                                                  ')
GO
INSERT [CategoriesCrime] ([IdCategorieCrime], [Categorie]) VALUES (2, N'Crimes contre la propriété                                                 ')
GO
INSERT [CategoriesCrime] ([IdCategorieCrime], [Categorie]) VALUES (3, N'Fraudes                                                                    ')
GO
INSERT [CategoriesCrime] ([IdCategorieCrime], [Categorie]) VALUES (4, N'Autres infractions au Code criminel                                        ')
GO
INSERT [CategoriesCrime] ([IdCategorieCrime], [Categorie]) VALUES (5, N'Stupéfiants                                                                ')
GO
INSERT [CategoriesCrime] ([IdCategorieCrime], [Categorie]) VALUES (6, N'Conduite de véhicule - Moyens de transport                                 ')
GO
SET IDENTITY_INSERT [CategoriesCrime] OFF
GO
SET IDENTITY_INSERT [Conditions] ON 

GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (2, 12, 5, N'Avoir comme adresse le
 ', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (3, 12, NULL, N'Ne pas entrer en contact avec ', NULL, NULL, N'Julie Lapierre', NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (4, 12, NULL, N'Doit garder la paix et avoir bonne conduite', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (6, 19, 7, N'Avoir comme adresse le ', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (7, 19, NULL, N'Ne pas fréquenter ', NULL, NULL, NULL, N'des gens ayant des dossiers criminels
')
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (8, 19, NULL, N'Aucune consommation d''alcool ou de drogue non prescrite
', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (10, 19, NULL, N'Doit garder la paix et avoir bonne conduite', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (12, 18, 6, N'Avoir comme adresse le', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (13, 18, NULL, N'Ne pas entrer en contact avec ', NULL, NULL, N'Alain Coutu', NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (14, 18, NULL, N'Aucune consommation d''alcool ou de drogue non prescrite
', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (15, 18, NULL, N'Doit garder la paix et avoir bonne conduite', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (16, 26, 10, N'Avoir comme adresse le
', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (18, 26, NULL, N'Doit garder la paix et avoir bonne conduite', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (23, 18, NULL, N'Aucune consommation d''alcool ou de drogue non prescrite', NULL, NULL, NULL, NULL)
GO
INSERT [Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (24, 26, NULL, N'Ne pas fréquenter', NULL, NULL, NULL, N'Vincent Leblanc')
GO
SET IDENTITY_INSERT [Conditions] OFF
GO
SET IDENTITY_INSERT [Crimes] ON 

GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (1, 1, N'Meurtre')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (2, 1, N'Homicide involontaire')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (3, 1, N'Infanticide')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (4, 1, N'Négligence criminelle entraînant la mort')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (5, 1, N'Tentative de meurtre')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (6, 1, N'Agression sexuelle')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (7, 1, N'Contact sexuel')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (8, 1, N'Exploitation sexuelle')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (9, 1, N'Inceste')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (10, 1, N'Pornographie juvénile')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (11, 1, N'Leurre au moyen d’un ordinateur')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (12, 1, N'Action indécente')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (13, 1, N'Voie de fait grave')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (14, 1, N'Agression armée ou infliction de lésions corporelles')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (15, 1, N'Voie de fait armée')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (16, 1, N'Voie de fait simple')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (17, 1, N'Infliction illégale de lésions corporelles')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (18, 1, N'Décharger une arme à feu avec intention')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (19, 1, N'Braquer une arme à feu')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (20, 1, N'Négligence criminelle entraînant des lésions corporelles')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (21, 1, N'Enlèvement')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (22, 1, N'Séquestration')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (23, 1, N'Traite de personne')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (24, 1, N'Enlèvement en contravention d’une ordonnance de garde')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (25, 1, N'Vol qualifié sur une personne')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (26, 1, N'Vol qualifié dans un commerce')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (27, 1, N'Vol qualifié dans une institution financière')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (28, 1, N'Vol qualifié de véhicule')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (29, 1, N'Vol qualifié de sac à main')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (30, 1, N'Autre vol qualifié')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (31, 1, N'Extorsion - personne')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (32, 1, N'Harcèlement criminel')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (33, 1, N'Appels téléphoniques indécents, harassants')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (34, 1, N'Proférer des menaces')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (35, 1, N'Incendie/insouciance de vie')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (36, 1, N'Intimidation générale')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (37, 2, N'Crime d''incendie')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (38, 2, N'Intro./effrac. dans résidence privée')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (39, 2, N'Intro./effrac. dans établissement commercial')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (40, 2, N'Vol de + 5 000 $, dans/sur véhicule')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (41, 2, N'Vol de + 5 000 $, sac à main')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (42, 2, N'Vol de + 5 000 $, à la tire')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (43, 2, N'Vol de + 5 000 $, à l’étalage')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (44, 2, N'Vol de + 5 000 $, bicyclette')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (45, 2, N'Autre vol de + 5 000 $')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (46, 2, N'Vol de véhicule')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (47, 2, N'Vol de 5 000 $ et moins, dans /sur véhicule')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (48, 2, N'Vol de 5 000 $ et moins, sac à main')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (49, 2, N'Vol de 5 000 $ et moins, à la tire')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (50, 2, N'Vol de 5 000 $ et moins, à l’étalage')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (51, 2, N'Vol de 5 000 $ et moins, bicyclette')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (52, 2, N'Autre vol de 5 000 $ et moins')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (53, 2, N'Recel de + de 5 000 $')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (54, 2, N'Recel de 5 000 $ et moins')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (55, 3, N'Chèque')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (56, 3, N'Guichet automatique')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (57, 3, N'Supposition de personne')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (58, 3, N'Télémarketing')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (59, 3, N'Valeurs mobilières, instruments financiers')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (60, 3, N'Par ordinateur')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (61, 3, N'Vol d’identité')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (62, 3, N'Infraction relative à la monnaie (reproduction, …)')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (63, 3, N'Utilisation de monnaie contrefaite')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (64, 3, N'Autres fraudes')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (65, 3, N'Méfait : dom. matériels de + 5 000 $')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (66, 3, N'Méfait : dommages matériels de 5 000 $ et moins')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (67, 3, N'Méfait : + 5 000 $ sur véhicule')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (68, 3, N'Méfait : 5 000 $ et moins sur véhicule')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (69, 3, N'Méfait (graffiti) : + 5 000 $')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (70, 3, N'Méfait (graffiti) : - 5 000 $')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (71, 3, N'Biens de culte (religieux) de + de 5 000 $')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (72, 3, N'Biens et culte (religieux) 5 000 $ et moins')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (73, 4, N'Maison de débauche')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (74, 4, N'Proxénétisme')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (75, 4, N'Prostitution, moins de 18 ans - proxénétisme')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (76, 4, N'Maison de paris')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (77, 4, N'Maison de jeux')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (78, 4, N'Loterie illégale')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (79, 4, N'Arme à feu - Usage')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (80, 4, N'Arme à feu - Trafic')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (81, 4, N'Arme à feu - Possession')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (82, 4, N'Arme à feu - Usage dangereux')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (83, 4, N'Arme à feu - Entreposage non sécuritaire')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (84, 4, N'Troubler la paix')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (85, 4, N'Évasion d’une garde légale')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (86, 4, N'Production / distribution de pornographie juvénile')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (87, 4, N'Possession de pornographie juvénile')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (88, 4, N'Nuire à un fonctionnaire public ou à un agent de la paix')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (89, 4, N'Détenu en liberté illégale')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (90, 4, N'Intrusion de nuit')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (91, 4, N'Défaut de comparaître')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (92, 4, N'Manquement aux conditions de la probation')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (93, 4, N'Incitation publique à la haine')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (94, 4, N'Terrorisme')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (95, 4, N'Méfait public')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (96, 4, N'Nuisance publique')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (97, 4, N'Atteinte à la vie privée')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (98, 4, N'Infraction contre la réputation et la personne')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (99, 4, N'Cruauté envers un animal')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (100, 4, N'Participation aux activités - organisation criminelle')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (101, 4, N'Recyclage des produits de la criminalité')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (102, 5, N'Possession')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (103, 5, N'Possession en vue trafic')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (104, 5, N'Trafic')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (105, 5, N'Importation / Production')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (106, 6, N'Conduite dangereuse de véhicule')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (107, 6, N'Capacité de conduire affaiblie')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (108, 6, N'Délit de fuite - Véhicule moteur')
GO
INSERT [Crimes] ([IdCrime], [IdCategorieCrime], [Nature]) VALUES (109, 6, N'Course')
GO
SET IDENTITY_INSERT [Crimes] OFF
GO
SET IDENTITY_INSERT [FPS] ON 

GO
INSERT [FPS] ([IdFPS], [IdPersonne], [NoFPS], [DateMesure], [CD], [Antecedents], [Violent], [Echappe], [Suicidaire], [Desequilibre], [Contagieux], [Violence], [Fraude], [ConduiteVehicule], [IntroEffraction], [Sexe], [ArmeOffensive], [Vol], [Drogue], [Mefait], [Incendie], [AutreInfraction]) VALUES (4, 7, N'438761H', CAST(N'2020-01-01T00:00:00.000' AS DateTime), N'W01', N'Voie de fait', 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
GO
SET IDENTITY_INSERT [FPS] OFF
GO
SET IDENTITY_INSERT [IBAF] ON 

GO
INSERT [IBAF] ([IdIBAF], [NoSerie], [Marque], [Calibre], [TypeArme], [NoEvenement]) VALUES (1, N'1597538', N'SMITH & WESSON', N'357', N'Révolver', N'108-220304-0006')
GO
INSERT [IBAF] ([IdIBAF], [NoSerie], [Marque], [Calibre], [TypeArme], [NoEvenement]) VALUES (2, N'1397139', N'BERETTA', N'9', N'Pistolet', N'302-220306-0009')
GO
INSERT [IBAF] ([IdIBAF], [NoSerie], [Marque], [Calibre], [TypeArme], [NoEvenement]) VALUES (3, N'3572583', N'Winchester', N'223', N'Carabine', N'123-220308-0023')
GO
INSERT [IBAF] ([IdIBAF], [NoSerie], [Marque], [Calibre], [TypeArme], [NoEvenement]) VALUES (4, N'5462885', N'REMINGTON', N'12', N'Fusil', N'108-220310-0003')
GO
SET IDENTITY_INSERT [IBAF] OFF
GO
SET IDENTITY_INSERT [IBOB] ON 

GO
INSERT [IBOB] ([IdIBOB], [NoSerie], [Marque], [Modele], [TypeObjet], [NoEvenement]) VALUES (1, N'410MXBPVF637', N'LG', N'32LB5600-UZ', N'RA', N'123-220301-0007')
GO
INSERT [IBOB] ([IdIBOB], [NoSerie], [Marque], [Modele], [TypeObjet], [NoEvenement]) VALUES (2, N'168TRDM65298', N'TREK', N'DOMANEAL3', N'BI', N'108-220302-0011')
GO
INSERT [IBOB] ([IdIBOB], [NoSerie], [Marque], [Modele], [TypeObjet], [NoEvenement]) VALUES (3, N'ZEW1BJAG90009MN', N'SAMSUNG', N'C460PW', N'EB', N'302-220303-0014')
GO
INSERT [IBOB] ([IdIBOB], [NoSerie], [Marque], [Modele], [TypeObjet], [NoEvenement]) VALUES (4, N'52000790', N'NIKON', N'AW120', N'EP', N'123-220304-0028')
GO
INSERT [IBOB] ([IdIBOB], [NoSerie], [Marque], [Modele], [TypeObjet], [NoEvenement]) VALUES (5, N'91324', N'Dewalt', N'Dcd785', N'MO', N'108-220305-0037')
GO
INSERT [IBOB] ([IdIBOB], [NoSerie], [Marque], [Modele], [TypeObjet], [NoEvenement]) VALUES (6, N'R9-OWPZL', N'IBM', N'THINKPAD10', N'OR', N'302-220306-0046')
GO
INSERT [IBOB] ([IdIBOB], [NoSerie], [Marque], [Modele], [TypeObjet], [NoEvenement]) VALUES (7, N'DMPJ2LCTDVGH', N'APPLE', N'IPAD', N'TA', N'123-220307-0031')
GO
INSERT [IBOB] ([IdIBOB], [NoSerie], [Marque], [Modele], [TypeObjet], [NoEvenement]) VALUES (8, N'C8PVH37SJC6K', N'APPLE', N'IPHONE 8', N'TL', N'109-220308-0046')
GO
INSERT [IBOB] ([IdIBOB], [NoSerie], [Marque], [Modele], [TypeObjet], [NoEvenement]) VALUES (9, N'7PB4702713', N'YAMAHA', N'EF20IST', N'AU', N'302-220309-0001')
GO
SET IDENTITY_INSERT [IBOB] OFF
GO
SET IDENTITY_INSERT [IBVA] ON 

GO
INSERT [IBVA] ([IdIBVA], [Identifiant], [Auteur], [TypeValeur], [TypeEvenement], [NoEvenement]) VALUES (5, N'628181-4249-96708', N'MASTERCARD', N'Carte de crédit / débit', N'Perdu', N'123-220301-0007')
GO
INSERT [IBVA] ([IdIBVA], [Identifiant], [Auteur], [TypeValeur], [TypeEvenement], [NoEvenement]) VALUES (6, N'Bsc230087', N'Banque canada', N'Devise', N'Volé', N'108-220303-0011')
GO
INSERT [IBVA] ([IdIBVA], [Identifiant], [Auteur], [TypeValeur], [TypeEvenement], [NoEvenement]) VALUES (7, N'ROMANTIQUE OUTREMONT', N'RICHARD SAVOIE', N'Œuvre d''art', N'Volé', N'302-220305-0014')
GO
INSERT [IBVA] ([IdIBVA], [Identifiant], [Auteur], [TypeValeur], [TypeEvenement], [NoEvenement]) VALUES (8, N'GC872783', N'CANADA', N'Passeport', N'Perdu', N'123-220307-0028')
GO
SET IDENTITY_INSERT [IBVA] OFF
GO
SET IDENTITY_INSERT [IPPE] ON 

GO
INSERT [IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [IdNatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (8, N'108-220208-0031', N'Recherché', N'Municipale de Longueuil', NULL, NULL, NULL, N'Municipale de Longueuil', N'CM-LGL-M-26840', NULL, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [IdNatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (11, N'302-220131-0056', N'Sous observation', NULL, N'Fréquentation criminelle', NULL, N'LVL-RENS-468259', NULL, NULL, NULL, 61, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [IdNatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (12, N'123-220115-0014', N'Accusé', NULL, NULL, NULL, NULL, N'Municipale de Montréal', NULL, N'CM- MTL-57931-852', 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [IdNatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (18, N'123-200303-0026', N'Probation', NULL, NULL, NULL, NULL, N'Municipale de Montréal', NULL, N'CM-MTL-58246-829', 36, NULL, CAST(N'2022-03-01T00:00:00.000' AS DateTime), NULL, N'David Chapdelaine
', NULL, N'5142547131', N'222
')
GO
INSERT [IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [IdNatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (19, N'108-110525-0003', N'Libération Conditionnelle', NULL, NULL, NULL, NULL, N'Cour du Québec - Chambre criminelle et pénale', NULL, N'500-01-310-35719-654', 5, N'Prison de Port-Cartier', CAST(N'2022-09-19T00:00:00.000' AS DateTime), NULL, NULL, N'Benoit Ducharme', N'5142547131', NULL)
GO
INSERT [IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [IdNatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (20, N'302-220208-0016', N'Disparu', NULL, NULL, N'Disparition', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'3546 boul. De la Concorde Est, Laval', NULL, NULL, NULL, NULL)
GO
INSERT [IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [IdNatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (22, N'123-201225-0016', N'Interdit', NULL, NULL, N'Conduite de véhicule', NULL, N'Municipale de Montréal', NULL, N'CM-MTL-16794-356', 107, NULL, CAST(N'2022-10-29T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL)
GO
INSERT [IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [IdNatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (26, N'123-220115-0015', N'Accusé', NULL, NULL, NULL, NULL, N'Cour du Québec', NULL, N'500-01-310-25846-159', 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [IdNatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (27, N'108-200207-0022', N'Interdit', NULL, NULL, N'Arme à feu', NULL, N'Cour du Québec', NULL, N'500-01-310-23654-846', 25, NULL, CAST(N'2031-10-29T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [IPPE] OFF
GO
SET IDENTITY_INSERT [Personnes] ON 

GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (1, N'Enseignant', N'Coutu', N'Jean', NULL, 1, CAST(N'1998-06-24T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (3, N'Enseignant', N'Ducharme', N'Benoit', NULL, 1, CAST(N'1975-08-31T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (4, N'Personnage', N'Sirois', N'Danielle', NULL, 0, CAST(N'1980-02-14T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (5, N'Personnage', N'Bélanger', N'Claude', NULL, 1, CAST(N'1976-07-12T00:00:00.000' AS DateTime), NULL, NULL, N'705 rue Notre-Dame
', NULL, N'Repentigny', N'Qc', N'J6A 2X1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (6, N'Enseignant', N'Levasseur', N'Marc', NULL, 1, CAST(N'1971-11-07T00:00:00.000' AS DateTime), NULL, NULL, N'3800 rue Sherbrooke Est', NULL, N'Montréal', N'Qc', N'H1X 2A2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (7, N'Personnage', N'Hébert', N'Francis', NULL, 1, CAST(N'1992-10-19T00:00:00.000' AS DateTime), NULL, NULL, N'150 Pl. Charles-Le Moyne', NULL, N'Longueuil', N'Qc', N'J4K 0A8', N'latino', NULL, NULL, N'vert', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (8, N'Étudiant', N'Amoussougbo', N'Yaken', NULL, 1, CAST(N'2000-03-04T00:00:00.000' AS DateTime), NULL, NULL, N'3065 Paul Pau', NULL, N'Montréal', N'Québec', N'H1L 4M2', N'Noir', 175, 75, N'Noir', N'Noir', NULL, 0, 1, 1, 0, 0, N'T-shirt verte', N'Jeans bleu', N'Espadrille fluo')
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (9, N'Enseignant', N'Lemire', N'Jessy', NULL, 0, CAST(N'1985-10-28T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (10, N'Étudiant', N'Michaud', N'Noémie', NULL, 0, CAST(N'2002-07-08T00:00:00.000' AS DateTime), NULL, NULL, N'49 route du Long-Sault', N'null', N'St-André d''Argenteuil', N'Qc', N'J0V 1X0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (12, N'Enseignant', N'Bloe', N'Joe', NULL, 1, CAST(N'1964-05-12T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL)
GO
INSERT [Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (13, N'Enseignant', N'Binette', N'Bob', N'Épine', 1, CAST(N'1964-08-12T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [Personnes] OFF
GO
INSERT [PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (3, 8)
GO
INSERT [PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (4, 11)
GO
INSERT [PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (5, 12)
GO
INSERT [PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (6, 18)
GO
INSERT [PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (7, 19)
GO
INSERT [PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (8, 20)
GO
INSERT [PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (9, 22)
GO
INSERT [PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (10, 26)
GO
INSERT [PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (10, 27)
GO
SET IDENTITY_INSERT [Utilisateurs] ON 

GO
INSERT [Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [IdPersonne]) VALUES (1, N'e1233772', N'bonjour', 1, 8)
GO
INSERT [Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [IdPersonne]) VALUES (2, N'e1233152', N'bonjour', 1, 10)
GO
INSERT [Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [IdPersonne]) VALUES (11, N'2248', N'bonjour', 0, 1)
GO
SET IDENTITY_INSERT [Utilisateurs] OFF
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ__FPS__3AFC042386CD78F8]    Script Date: 07/03/2023 12:37:51 ******/
ALTER TABLE [FPS] ADD UNIQUE NONCLUSTERED 
(
	[NoFPS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ__Utilisat__DD380E4FCDE609CB]    Script Date: 07/03/2023 12:37:51 ******/
ALTER TABLE [Utilisateurs] ADD  CONSTRAINT [UQ__Utilisat__DD380E4FCDE609CB] UNIQUE NONCLUSTERED 
(
	[Identifiant] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [Violence]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [Fraude]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [ConduiteVehicule]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [IntroEffraction]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [Sexe]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [ArmeOffensive]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [Vol]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [Drogue]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [Mefait]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [Incendie]
GO
ALTER TABLE [FPS] ADD  DEFAULT ((0)) FOR [AutreInfraction]
GO
ALTER TABLE [Conditions]  WITH CHECK ADD  CONSTRAINT [FK_Conditions_IPPE] FOREIGN KEY([IdIPPE])
REFERENCES [IPPE] ([IdIPPE])
GO
ALTER TABLE [Conditions] CHECK CONSTRAINT [FK_Conditions_IPPE]
GO
ALTER TABLE [Conditions]  WITH CHECK ADD  CONSTRAINT [FK_Conditions_Personnes] FOREIGN KEY([IdPersonne])
REFERENCES [Personnes] ([IdPersonne])
GO
ALTER TABLE [Conditions] CHECK CONSTRAINT [FK_Conditions_Personnes]
GO
ALTER TABLE [Crimes]  WITH CHECK ADD  CONSTRAINT [FK_Crimes_CategoriesCrime] FOREIGN KEY([IdCategorieCrime])
REFERENCES [CategoriesCrime] ([IdCategorieCrime])
GO
ALTER TABLE [Crimes] CHECK CONSTRAINT [FK_Crimes_CategoriesCrime]
GO
ALTER TABLE [FPS]  WITH CHECK ADD  CONSTRAINT [FK_FPS_Personnes] FOREIGN KEY([IdPersonne])
REFERENCES [Personnes] ([IdPersonne])
GO
ALTER TABLE [FPS] CHECK CONSTRAINT [FK_FPS_Personnes]
GO
ALTER TABLE [IPPE]  WITH CHECK ADD  CONSTRAINT [FK_IPPE_Crimes] FOREIGN KEY([IdNatureCrime])
REFERENCES [Crimes] ([IdCrime])
GO
ALTER TABLE [IPPE] CHECK CONSTRAINT [FK_IPPE_Crimes]
GO
ALTER TABLE [PersonnesIPPE]  WITH CHECK ADD  CONSTRAINT [FK_PersonnesIPPE_IPPE] FOREIGN KEY([IdIPPE])
REFERENCES [IPPE] ([IdIPPE])
GO
ALTER TABLE [PersonnesIPPE] CHECK CONSTRAINT [FK_PersonnesIPPE_IPPE]
GO
ALTER TABLE [PersonnesIPPE]  WITH CHECK ADD  CONSTRAINT [FK_PersonnesIPPE_Personnes] FOREIGN KEY([IdPersonne])
REFERENCES [Personnes] ([IdPersonne])
GO
ALTER TABLE [PersonnesIPPE] CHECK CONSTRAINT [FK_PersonnesIPPE_Personnes]
GO
ALTER TABLE [Utilisateurs]  WITH CHECK ADD  CONSTRAINT [FK_Utilisateurs_Personnes] FOREIGN KEY([IdPersonne])
REFERENCES [Personnes] ([IdPersonne])
GO
ALTER TABLE [Utilisateurs] CHECK CONSTRAINT [FK_Utilisateurs_Personnes]
GO
ALTER TABLE [Personnes]  WITH CHECK ADD  CONSTRAINT [CK_Personnes] CHECK  (([TypePersonne]='Personnage' OR [TypePersonne]='Comédien' OR [TypePersonne]='Étudiant' OR [TypePersonne]='Enseignant'))
GO
ALTER TABLE [Personnes] CHECK CONSTRAINT [CK_Personnes]
GO
