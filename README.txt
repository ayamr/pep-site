PEP — Site statique bilingue (FR / Kreyòl Ayisyen), ton militant

- Sélecteur de langue (dropdown) en haut à droite.
- Traduction: assets/i18n.json (toutes les chaînes UI).
- “À la une”: assets/news.json (4 actus), défilement en boucle sur la home.
- Menu mobile inclus.

Lancer en local:
- Ouvrir index.html
- ou: python -m http.server 8000

Modifier les textes:
- Ajouter/éditer des clés dans assets/i18n.json
- Dans le HTML, mettre data-i18n="ma_cle" sur un élément texte

Modifier les 4 actus “À la une”:
- assets/news.json (date/title/summary en fr et ht + lien vers l’ancre sur actualites.html)


Note: Cette version n'utilise pas fetch() (compatible ouverture directe du fichier index.html).