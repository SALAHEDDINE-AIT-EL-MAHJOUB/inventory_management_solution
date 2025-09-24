# StockPilot – Solution SaaS de Gestion d’Inventaires

## Présentation

**StockPilot** est une application web SaaS développée lors d’un projet de fin d’annee à Alexsys Solutions, société marocaine spécialisée dans le conseil technologique et le développement de solutions digitales sur mesure.  
L’objectif du projet est d’optimiser la gestion des inventaires pour des environnements industriels complexes, en assurant flexibilité, traçabilité et automatisation des processus.

## Fonctionnalités principales

- **Gestion centralisée des stocks** : Suivi en temps réel, traçabilité des mouvements, gestion des entrées/sorties.
- **Typologies d’inventaire** : Comptage simple ou double avec arbitrage automatique en cas d’écart.
- **Gestion des sites, zones et produits** : Organisation hiérarchique, ajout/modification en temps réel, gestion des codes-barres.
- **Gestion des utilisateurs** : Rôles Admin, Client, Opérateur, gestion des équipes et des affectations.
- **Sécurité** : Authentification JWT, gestion des droits d’accès.
- **Supervision et statistiques** : Tableaux de bord, visualisation graphique des stocks et inventaires.
- **Prévision de stock** : Analyse et prédiction via IA.

## Architecture technique

- **Backend** : ASP.NET Core (.NET 8), CQRS, MediatR, Entity Framework Core, SQL Server
- **Frontend** : React (TypeScript), Bootstrap, Recharts
- **Authentification** : JWT
- **Architecture** : Onion Architecture (Domain, Repository, Service, UI)




## Technologies utilisées

- ASP.NET Core, C#
- React, TypeScript, Bootstrap
- SQL Server, Entity Framework Core
- CQRS, MediatR, JWT
- Recharts

## Auteurs

- Salaheddine AIT EL MAHJOUB  
  Encadrants : Saadia Drissi (Académique), Yasser BOUAABANE (Professionnel)


## Références

- [ASP.NET Core Docs](https://learn.microsoft.com/en-us/aspnet/core)
- [React TypeScript](https://react.dev/learn/typescript)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [JWT Auth0 Docs](https://auth0.com/docs/secure/tokens/json-web-tokens)
- [Recharts](https://recharts.org/en-US)
