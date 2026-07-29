# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three confirmed audiences, in priority order set by the user:

1. **Jeunes urbains / primo-votants** (18-30 ans, Haïti) — à convaincre de s'engager ou de voter PEP pour la première fois. Public numérique, exigeant visuellement, sensible à une identité qui ne ressemble pas à un site institutionnel générique.
2. **Diaspora** — mobilisation, dons, réseaux de compétences et de financement depuis l'étranger.
3. **Base populaire existante ("masse paysanne")** — déjà présente dans les textes actuels : agriculteurs, communes, ancrage territorial. Ce public reste central dans le contenu politique mais n'est plus le seul destinataire visuel du site.

Job à accomplir sur le site : comprendre le projet politique, décider d'y adhérer/voter/donner, et pour la diaspora et la presse, évaluer la crédibilité et le sérieux du mouvement.

## Product Purpose

Site vitrine d'un parti politique haïtien (PEP — Parti de l'Émancipation Populaire) portant un projet de refondation nationale. Le site expose le manifeste, le programme (axes économie/services publics/justice/gouvernance), l'organisation du parti, l'actualité, et permet l'adhésion et le don via formulaires Google Forms. Succès = conversion en adhésion/don, lisibilité du positionnement, crédibilité perçue par la presse et les partenaires.

## Positioning

Rupture avec le système actuel : un mouvement neuf qui ne participe ni de près ni de loin aux dérives ayant conduit à l'impasse politique actuelle en Haïti — positionnement confirmé explicitement par l'utilisateur, distinct des partis établis qui négocient avec le système en place.

## Operating Context

- Site multi-pages statique (HTML/CSS/JS vanilla, sans framework ni build step), bilingue français (racine) et créole haïtien (dossier `ht/`), pages en miroir 1:1.
- Formulaires d'adhésion/don/contact soumis via Google Forms (endpoints `docs.google.com/forms/.../formResponse`), à conserver fonctionnels.
- Contenu politique (manifeste, tribunes, communiqués, plans sectoriels par axe) déjà rédigé et validé par le parti ; le travail de refonte porte sur la forme, pas sur le fond.
- Organigramme du parti affiché comme arbre hiérarchique avec connecteurs SVG dessinés dynamiquement en JS.

## Capabilities and Constraints

- Le logo et le nom officiel du parti ("Parti de l'Émancipation Populaire", sigle PEP) restent strictement inchangés — contrainte confirmée par l'utilisateur.
- Pas de framework front-end : toute évolution visuelle doit rester du HTML/CSS/JS statique compatible avec l'hébergement actuel.
- 74 pages HTML (37 FR + 37 KR en miroir) partagent un seul feuille de style (`assets/styles.css`) et un seul script (`assets/site.js`) : toute décision de design doit passer par ces fichiers partagés plutôt que par des styles par page, sous peine de dérive.
- Photos réelles de dirigeants déjà fournies (`assets/*.png/.jpg`) : pas d'imagerie générique/stock à inventer à leur place.
- Non décidé : accès à des photos supplémentaires (terrain, militants, événements) au-delà des portraits de direction actuellement disponibles.

## Brand Commitments

- Nom et sigle : "Parti de l'Émancipation Populaire" / PEP — fixes.
- Logo existant (`assets/logo.png`) — fixe, à ne pas redessiner.
- Devise/positionnement déjà écrit dans le manifeste ("refondation nationale", rupture avec les dérives passées) — à respecter dans le ton visuel.

## Evidence on Hand

- Contenu politique complet déjà rédigé (accueil, manifeste, programme par axes, communiqués, tribunes, pages "agir"/adhérer/donner/contact).
- Portraits réels de dirigeants (`leader-photo.png`, `leader-p.png`, `secretaire_pol.png`, `manasse.png`, `Daniel.jpg`).
- Logo officiel (`assets/logo.png`).
- Pas de témoignages clients, études de cas, presse ou benchmarks chiffrés : à ne pas inventer.

## Product Principles

1. La forme doit signaler "jeune et moderne" sans jamais changer le fond politique déjà validé par le parti.
2. Le site doit convaincre trois publics à la fois (primo-votants urbains, diaspora, base populaire) sans que l'un ne paraisse être un public secondaire mal servi.
3. La crédibilité (presse, partenaires) et l'énergie (jeunesse, rupture) doivent coexister — ni institutionnel-générique, ni gadget.
4. Toute évolution visuelle reste dans un HTML/CSS/JS statique partagé par 74 pages : cohérence systémique avant fantaisie ponctuelle.

## Accessibility & Inclusion

Aucune exigence spécifique établie au-delà des standards WCAG habituels (contraste, navigation clavier, `prefers-reduced-motion`) déjà appliqués lors de la précédente passe de refonte.
