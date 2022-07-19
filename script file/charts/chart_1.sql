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
VALUES (
    2001,
    2001,
    'CH-ACT',
    'Active Tenders',
    'CHART',
    6,
    NULL,
    '[451,453]',
    '[601]',
    '[82]',
    NULL
  ),
  (
    2002,
    2002,
    'CH-CLT',
    'Closing Tenders',
    'CHART',
    6,
    NULL,
    '[451,453]',
    '[601]',
    '[82]',
    NULL
  )