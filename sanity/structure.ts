import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (structureBuilder) => {
  return structureBuilder
    .list()
    .title('Content')
    .items([
      structureBuilder
        .listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(
          structureBuilder
            .document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
      structureBuilder
        .listItem()
        .title('Biography')
        .id('biography')
        .child(
          structureBuilder
            .document()
            .schemaType('biography')
            .documentId('biography'),
        ),
      structureBuilder.divider(),
      structureBuilder.documentTypeListItem('concert').title('Concerts'),
      structureBuilder.documentTypeListItem('repertoireEra').title('Repertoire'),
      structureBuilder.documentTypeListItem('mediaItem').title('Media (YouTube)'),
      structureBuilder.documentTypeListItem('galleryImage').title('Photos'),
    ]);
};
