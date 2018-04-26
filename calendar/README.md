# Calendar
Cahier des charges :
 Il s’agit de réaliser une page assez simple pour que l'utilisateur :
- puisse afficher un calendrier mensuel après avoir sélectionné un mois dans un menu déroulant (Ex : Janvier 17, Février 17...).
- puisse, suite à un clic ou un glissé de souris, sélectionner une ou plusieurs dates sur ce calendrier.
- puise également sélectionner toutes les dates correspondant à un jour de la semaine en une seule action. Par exemple tous les lundis du mois de janvier.

## Usage
Dans votre page html, créer un bloc div portant l'id "calendar" puis
utiliser jQuery version 3 et plus, librairie moment.js et le script du calendrier calendar.js

    <div id="calendar"></div>

    <script src="js/jquery.3.1.1.js"></script>
    <script src="js/moment-with-locales.js"></script>
    <script src="js/calendar.js"></script>
	
