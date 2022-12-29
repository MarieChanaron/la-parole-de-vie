# La Parole de Vie

CE PROJET EST ACTUELLEMENT EN COURS DE DEVELOPPEMENT

## Description

Il s'agit d'un projet personnel qui me tenait à coeur. Cette application a pour but principal d'aider les gens à méditer sur les versets bibliques.

## Fonctionnalités

Cette application comprend deux espaces :

- un espace de recherche, comprenant deux pages, la page d'accueil (contenant uniquement un formulaire) et la page affichant les résultats. La page de résultats permet également de lancer une nouvelle recherche, de filtrer les résultats, de naviguer à-travers les résultats, et de cacher les résultats ne comprenant pas une chaîne de caractères souhaitée.

- un espace de lecture de la Bible, composé d'une page, qui permet d'afficher la Bible chapitre par chapitre. Cette page comprend une table des matières permettant de nous repérer et sélectionner un livre parmi les 66 livres, ainsi qu'un formulaire de recherche par référence. Les boutons de navigation en bas du texte permettent de passer au chapitre précédent, ou au chapitre suivant.

Le fait de cliquer sur un verset proposé dans la page de résultats nous ramène vers le passage sélectionné, afin de pouvoir visualiser le verset dans son contexte.

## Provenance des données

Cette application web utilise l'[API Bible SuperSearch](https://www.biblesupersearch.com/)

## Traductions de la Bible

Cette application propose les quatre traductions de la Bible en langue française, proposées par Bible SuperSearch :
- La Bible Louis Segond (1910)
- La Bible de l'Epée (Calvin)
- la traduction du pasteur J-Fr Ostervald
- La traduction du pasteur David Martin 

J'ai constaté que la très grande majorité des applications bibliques utilisaient la Bible Louis Segond comme seule et unique traduction. J'apprécie beaucoup la Bible David Martin, d'une part pour la précision des mots choisis et par la beauté des tournures de l'époque, et d'autre part parce que cette traduction me permet de comprendre davantage le sens spirituel des versets. Je la propose ainsi comme traduction par défaut dans mon application. Le fait de proposer la traduction David Martin permet de la remettre au goût du jour alors qu'elle ne semble plus être éditée en format papier.

## Technologie et dépendances

React version 18.2.0  
npm create-react-app ***  
  
react-device-detect :   
npm install react-device-detect  

react-router-dom :  
npm install react-router-dom  

Material UI :  
npm install @mui/material @emotion/react @emotion/styled   