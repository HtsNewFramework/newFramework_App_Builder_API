DELETE FROM _UIX
WHERE ID > 600
SELECT *
FROM _UIX
WHERE ID > 600
INSERT INTO _UIX (
    ID,
    PRIORITY,
    CODE,
    NAME,
    TYPE,
    LEVEL,
    ATTRIBUTE,
    PARENT,
    APPLICATION,
    LAYOUT,
    [SCHEMA]
  )
VALUES(
    3001,
    3001,
    'FAV-ACT',
    'Active Tenders',
    'FAVOURITE',
    6,
    '{"Table":"HEADER","Type":"TENDER","Status":"ACTIVE"}',
    '[471]',
    '[601]',
    '[83]',
    NULL
  ),
  (
    3002,
    3002,
    'FAV-CLT',
    'Closing Tenders',
    'FAVOURITE',
    6,
    '{"Table":"HEADER","Type":"TENDER","Status":"ACTIVE",}',
    '[471]',
    '[601]',
    '[83]',
    NULL
  )