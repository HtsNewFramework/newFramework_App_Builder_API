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
    901,
    901,
    'NOT',
    'Notifications',
    'TOPNAV',
    6,
    '{"icon":"bell"}',
    '[471]',
    '[601]',
    NULL,
    NULL
  ),
  (
    902,
    902,
    'PRO',
    'Profile',
    'TOPNAV',
    6,
    '{"icon":"user"}',
    '[471]',
    '[601]',
    NULL,
    NULL
  ),
  (
    903,
    903,
    'SET',
    'Settings',
    'TOPNAV',
    6,
    '{"icon":"admin"}',
    '[471]',
    '[601]',
    NULL,
    NULL
  )