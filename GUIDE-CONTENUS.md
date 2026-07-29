# Ajouter un communiqué, une tribune ou une campagne

La page `actualites.html` et sa version créole `ht/actualites.html` utilisent des collections extensibles.

## Fonctionnement automatique

- Les 3 premières cartes de chaque rubrique sont visibles immédiatement.
- À partir de la 4e carte, un bouton « Afficher les N contenus » apparaît automatiquement.
- Le nombre N est calculé par `assets/site.js`.
- Sur téléphone, les cartes restent sur une seule colonne.

## Ajouter un contenu

1. Dupliquer une page existante du même type, par exemple `communique-reconstruction-etat.html`.
2. Renommer le fichier avec un nom simple, sans espace ni accent.
3. Modifier le titre, le résumé, les métadonnées et le corps du texte.
4. Créer la même page dans `ht/` pour la version créole.
5. Ajouter une carte au début de la bonne grille dans `actualites.html` et `ht/actualites.html`.

La carte doit garder ces attributs et classes :

```html
<a class="card article-card reveal linked-card content-card"
   data-content-item
   href="nom-de-la-page.html">
  <h3>Titre</h3>
  <p>Synthèse courte.</p>
  <span class="card-cta">Lire le contenu →</span>
</a>
```

Ne pas modifier `data-content-collection`, `data-initial-count="3"` ou le bouton `data-content-more`.
