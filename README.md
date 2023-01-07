# La Parole de Vie

Lien vers le projet / Link to the project :
https://la-parole-de-vie.net/

## Description

Cette application est un projet personnel. Elle a pour objectif d'aider à méditer sur les versets bibliques.

## Fonctionnalités

Cette application comprend deux espaces :

- un espace de recherche, comprenant deux pages, la page d'accueil (contenant uniquement un formulaire) et la page affichant les résultats. La page de résultats permet également de lancer une nouvelle recherche, de filtrer les résultats, de naviguer à-travers les résultats, et de cacher les résultats ne comprenant pas une chaîne de caractères souhaitée.

- un espace de lecture de la Bible, composé d'une page, qui permet d'afficher la Bible chapitre par chapitre. Cette page comprend une table des matières permettant de nous repérer et sélectionner un livre parmi les 66 livres, ainsi qu'un formulaire de recherche par référence. Les boutons de navigation en bas du texte permettent de passer au chapitre précédent, ou au chapitre suivant.

Le fait de cliquer sur un verset proposé dans la page de résultats nous ramène vers le passage sélectionné, afin de pouvoir visualiser le verset dans son contexte.

## Provenance des données

Cette application web utilise la base de données de l'[API Bible SuperSearch](https://www.biblesupersearch.com/)

## Traductions de la Bible

Cette application propose quatre traductions de la Bible en langue française:
- David Martin (traduction par défaut)
- Louis Segond (1910)
- La Bible de l'Epée
- J-Fr Ostervald

## Technologie et dépendances

React version 18.2.0  
npx create-react-app ***  
  
react-device-detect :   
npm install react-device-detect  

react-router-dom :  
npm install react-router-dom  

Material UI :  
npm install @mui/material @emotion/react @emotion/styled   