Application des trois (3) étapes classiques de la modélisation :
1. MCD (Modèle Conceptuel de Données) : Pour visualiser les grandes idées (entités) et leurs liens (relations).
2. MLD (Modèle Logique de Données) : Pour transformer ces idées en tables et en clés, de manière théorique.
3. MPD (Modèle Physique de Données) : Pour écrire le code SQL qui créera concrètement ces tables dans SQLite.

---

1. MCD (Modèle Conceptuel de Données)

Le MCD représente les concepts principaux et comment ils interagissent.
Entités (les "objets" principaux) :

-UTILISATEUR : Représente toute personne pouvant se connecter. Il possède un rôle qui définit ses permissions.
Attributs : id, nom, prenom, email, mot\_de\_passe, role, date\_inscription*
ÉQUIPE : Représente une équipe du championnat.
Attributs : id, nom\_equipe, logo\_url*
JOUEUR : Représente le profil sportif d'un utilisateur qui est joueur. C'est une 

spécialisation de l'UTILISATEUR.
Attributs : id, numero\_maillot, position
MATCH : Représente une rencontre entre deux équipes.
Attributs : id, date\_match, stade, score\_1, score\_2*
ÉVÉNEMENT : Représente un fait de jeu (but, carton).
Attributs : id, type\_evenement, minute

Relations (les liens entre les entités) :**

-Un UTILISATEUR (avec le rôle 'manager') **GÈRE** une et une seule **ÉQUIPE**. Une ÉQUIPE est gérée par un et un seul **UTILISATEUR**. (Relation 1,1 - 1,1)

-Un UTILISATEUR (avec le rôle 'joueur') **EST** un et un seul profil **JOUEUR**. (Relation 1,1 - 1,1)

-Un JOUEUR APPARTIENT À une et une seule **ÉQUIPE**. Une **ÉQUIPE** peut avoir plusieurs JOUEURS. (Relation 1,1 - 0,n)

Un MATCH OPPOSE deux ÉQUIPES (une à domicile, une à l'extérieur). (Relation modélisée par deux liens vers ÉQUIPE)

Un ÉVÉNEMENT CONCERNE un et un seul MATCH. Un MATCH peut avoir plusieurs ÉVÉNEMENTS. (Relation 1,1 - 0,n)

Un ÉVÉNEMENT est PROVOQUÉ PAR un et un seul JOUEUR. Un JOUEUR peut provoquer plusieurs ÉVÉNEMENTS. (Relation 1,1 - 0,n)

Ce modèle clarifie que "Manager" et "Joueur" ne sont pas des entités séparées, mais des rôles ou des spécialisations de l'entité UTILISATEUR. C'est une approche plus robuste et flexible.

---

### 2. MLD (Modèle Logique de Données)

On traduit le MCD en un schéma de tables avec des clés primaires (PK) et étrangères (FK).

-UTILISATEURS (**<u>id_user</u>**, nom, prenom, genre, nom_utilisateur, mot_de_passe, role, date_inscription)
`role` sera un texte contraint à 'admin', 'manager', 'joueur'.

-EQUIPES (**<u>id_equipe</u>**, nom_equipe, logo_url, *#id_manager*)
#id_manager` est une clé étrangère qui pointe vers `UTILISATEURS(id_user)`.

-JOUEURS (**<u>id_joueur</u>**, numero_maillot, position, *#id_user*, *#id_equipe*)
`#id_user` est une clé étrangère qui pointe vers `UTILISATEURS(id_user)`.
`#id_equipe` est une clé étrangère qui pointe vers `EQUIPES(id_equipe)`.

-MATCHS (**<u>id_match</u>**, date_match, stade, score_equipe_1, score_equipe_2, *#id_equipe_1*, *#id_equipe_2*)
`#id_equipe_1` est une clé étrangère qui pointe vers `EQUIPES(id_equipe)`.
`#id_equipe_2` est une clé étrangère qui pointe vers `EQUIPES(id_equipe)`.

-EVENEMENTS_MATCH (**<u>id_evenement</u>**, type_evenement, minute, *#id_match*, *#id_joueur*)
`type_evenement` sera un texte contraint à 'but', 'carton_jaune', 'carton_rouge'.
`#id_match` est une clé étrangère qui pointe vers `MATCHS(id_match)`.
`#id_joueur` est une clé étrangère qui pointe vers `JOUEURS(id_joueur)`.

---

### 3. MPD (Modèle Physique de Données) - Code SQL pour SQLite

Voici le code SQL pour créer ces tables. Il est adapté pour SQLite :
-`INTEGER PRIMARY KEY` est utilisé pour les clés primaires auto-incrémentées.
`TEXT` est le type de données standard pour les chaînes de caractères.
`CHECK` est utilisé pour simuler le type `ENUM` qui n'existe pas dans SQLite.
*   Les contraintes `FOREIGN KEY` sont définies pour assurer l'intégrité des données.

```sql
-- Suppression des tables si elles existent déjà pour permettre une réinitialisation facile
DROP TABLE IF EXISTS EVENEMENTS_MATCH;
DROP TABLE IF EXISTS MATCHS;
DROP TABLE IF EXISTS JOUEURS;
DROP TABLE IF EXISTS EQUIPES;
DROP TABLE IF EXISTS UTILISATEURS;

-- -----------------------------------------------------
-- Table UTILISATEURS
-- Stocke les informations de connexion pour tous les types d'utilisateurs.
-- -----------------------------------------------------
CREATE TABLE UTILISATEURS (
  id_user INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  genre TEXT NOT NULL,
  nom_utilisateur TEXT NOT NULL,
  mot_de_passe TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('admin', 'manager', 'joueur')),  
  date_inscription TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
NB : Pour optimiser davantage la base de données, vous pouvez remplacer les intitulés de rôles par une codification numérique, par exemple : 0 pour administrateur, 1 pour manager, et 2 pour joueur.
-- -----------------------------------------------------
-- Table EQUIPES
-- Stocke les informations sur chaque équipe. Chaque équipe est liée à un manager.
-- -----------------------------------------------------
CREATE TABLE EQUIPES (
  id_equipe INTEGER PRIMARY KEY AUTOINCREMENT,
  nom_equipe TEXT NOT NULL UNIQUE,
  logo_url TEXT, -- Optionnel, peut contenir un lien vers l'image du logo
  id_manager INTEGER NOT NULL UNIQUE, -- Une équipe a un seul manager, un manager gère une seule équipe
  FOREIGN KEY (id_manager) REFERENCES UTILISATEURS(id_user) ON DELETE RESTRICT
);

-- -----------------------------------------------------
-- Table JOUEURS
-- Profil sportif d'un utilisateur. Lie un utilisateur à une équipe et à des attributs de joueur.
-- -----------------------------------------------------
CREATE TABLE JOUEURS (
  id_joueur INTEGER PRIMARY KEY AUTOINCREMENT,
  id_user INTEGER NOT NULL UNIQUE, -- Un profil joueur est lié à un seul compte utilisateur
  id_equipe INTEGER NOT NULL,
  numero_maillot INTEGER,
  position TEXT CHECK(position IN ('Gardien', 'Défenseur', 'Milieu', 'Attaquant')),
  FOREIGN KEY (id_user) REFERENCES UTILISATEURS(id_user) ON DELETE CASCADE, -- Si l'utilisateur est supprimé, son profil joueur l'est aussi
  FOREIGN KEY (id_equipe) REFERENCES EQUIPES(id_equipe) ON DELETE CASCADE -- Si l'équipe est supprimée, les joueurs aussi
);

-- -----------------------------------------------------
-- Table MATCHS
-- Stocke les informations sur les matchs joués ou à venir.
-- -----------------------------------------------------
CREATE TABLE MATCHS (
  id_match INTEGER PRIMARY KEY AUTOINCREMENT,
  id_equipe_1 INTEGER NOT NULL,
  id_equipe_2 INTEGER NOT NULL,
  date_match TEXT NOT NULL,
  stade TEXT,
  score_equipe_1 INTEGER DEFAULT 0,
  score_equipe_2 INTEGER DEFAULT 0,
  FOREIGN KEY (id_equipe_1) REFERENCES EQUIPES(id_equipe) ON DELETE CASCADE,
  FOREIGN KEY (id_equipe_2) REFERENCES EQUIPES(id_equipe) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table EVENEMENTS_MATCH
-- Retrace les événements spécifiques (buts, cartons) d'un match, liés à un joueur.
-- -----------------------------------------------------
CREATE TABLE EVENEMENTS_MATCH (
  id_evenement INTEGER PRIMARY KEY AUTOINCREMENT,
  id_match INTEGER NOT NULL,
  id_joueur INTEGER NOT NULL,
  type_evenement TEXT NOT NULL CHECK(type_evenement IN ('but', 'carton_jaune', 'carton_rouge', 'remplacement_in', 'remplacement_out')),
  minute INTEGER NOT NULL,
  FOREIGN KEY (id_match) REFERENCES MATCHS(id_match) ON DELETE CASCADE,
  FOREIGN KEY (id_joueur) REFERENCES JOUEURS(id_joueur) ON DELETE CASCADE
);
```

### Explications des choix et améliorations

1. Séparation Utilisateur / Joueur : J'ai créé une table `UTILISATEURS` pour la connexion et une table `JOUEURS` pour les données sportives. C'est une bien meilleure pratique car un administrateur n'a pas besoin de `numero_maillot` ou de `position`. La table `JOUEURS` "spécialise" un utilisateur en lui donnant des attributs de joueur.

2. Lien Manager / Équipe : Le manager est un `UTILISATEUR` avec le rôle 'manager'. J'ai placé la clé étrangère `id_manager` directement dans la table `EQUIPES`. La contrainte `UNIQUE` sur `id_manager` garantit qu'un manager ne peut gérer qu'une seule équipe, ce qui simplifie la logique pour commencer.

3. Clarté des Noms : J'ai renommé `equipe1_id` en `id_equipe_1` et `equipe2_id` en `id_equipe_2` dans la table `MATCHS`. C'est plus explicite et évite toute confusion.

4. Simulation de `ENUM` : SQLite ne supporte pas le type `ENUM`. L'utilisation de `TEXT` avec une contrainte `CHECK` est la manière standard et recommandée de reproduire ce comportement, garantissant que seules les valeurs autorisées sont insérées (`'admin'`, `'manager'`, `'joueur'`, etc.).

5. Gestion des suppressions (`ON DELETE`) :
    *   `ON DELETE CASCADE` : Si on supprime une équipe, tous ses joueurs, matchs et événements liés sont supprimés automatiquement. C'est logique.
    *   `ON DELETE RESTRICT` : J'ai mis cette règle pour le manager d'une équipe. Vous ne pouvez pas supprimer un utilisateur s'il est encore manager d'une équipe. Il faut d'abord lui assigner une autre équipe ou supprimer l'équipe. C'est une sécurité.
