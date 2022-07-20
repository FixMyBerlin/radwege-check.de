# Store

- Use `zustand` instead of redux; it uses a hook pattern and is generally simpler and smaller
  - Empfohlen in https://syntax.fm/show/272/react-state-round-up
- Github https://github.com/pmndrs/zustand
- Volles Beispiel https://dev.to/aaronksaunders/managing-react-state-with-zustand-2e8k
- Wie man Stores splittet https://github.com/pmndrs/zustand/wiki/Splitting-the-store-into-separate-slices
  - Und naming recommendations https://github.com/pmndrs/zustand/wiki/Flux-inspired-practice
- Devtools einfügen https://github.com/pmndrs/zustand#redux-devtools

```
Top level states on <Scenes>
  - aggregation (with category)
  - ui states (handle …)
  - presets
  - showLogo
  - showSpinner
```

# GraphQl: Whitespace in Columns

"Has Whitespace" => "Has_Whitespace"

https://github.com/gatsbyjs/gatsby/issues/4751

# GraphQL: Rename Fields

```sql
query GetEntries {
  entries {
    id
    updatedAt: updated_at
  }
}
```

https://devinschulz.com/rename-fields-by-using-aliases-in-graphql/

# `npm install --save-dev @types/itemsjs`

Type Probleme…

# Ergebnismenge Performance

Test out https://react-virtual.tanstack.com/docs/overview

This should make it possible to display all 3k rows in one view without issues.

`npm install react-virtual --save`

More docs at https://react-virtual.tanstack.com/docs/api

Used by Placemark https://twitter.com/placemarkio/status/1417976468991315968

# Fonts

Prüfen, welche `.font-*` wir verwenden, dann in `gatsby-browser.js` die überflüssigen löschen.

Liste: https://tailwindcss.com/docs/font-weight#setting-the-font-weight
