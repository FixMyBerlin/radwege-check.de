# Print

```
@page {
  size: A4 landscape;
  size: 287mm 210mm;
}
```

- https://css-tricks.com/css-tricks-finally-gets-a-print-stylesheet/
- https://davidwalsh.name/css-page-breaks

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
