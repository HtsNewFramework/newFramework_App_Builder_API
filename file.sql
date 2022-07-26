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
    601,
    601,
    'ADMINPORTAL',
    'Admin Portal',
    'APP',
    6,
    '{"icon":"ThePlace"}',
    '[401]',
    NULL,
    '[1]',
    NULL
  )