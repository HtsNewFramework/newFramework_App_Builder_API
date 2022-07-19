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
    7101,
    7101,
    'CONTROL',
    'date',
    'date',
    10,
    '{"label":"Date","root_1":"_HEADER,_LINE","root_2":"DATE","root_3":"date_txn"}',
    '[5008]',
    '[601]',
    '[7001]',
    '{"validation":{"required": true}}'
  ),
  (
    7102,
    7102,
    'CONTROL',
    'remark',
    'text',
    10,
    '{"label":"Remark","root_1":"_HEADER,_LINE","root_2":"GENERAL","root_3":"remark"}',
    '[5008]',
    '[601]',
    '[7001]',
    NULL
  ),
  (
    7103,
    7103,
    'CONTROL',
    'city',
    'dropdown',
    10,
    '{"label":"City","data":"CITY","root_1":"_HEADER","root_2":"ENTITY","root_3":"entity_1_id"}',
    '[5008]',
    '[601]',
    '[7002]',
    '{"validation":{"required": true},"options":[{"label":"Select City","value":""}]}'
  ),
  (
    7104,
    7104,
    'CONTROL',
    'vendor',
    'dropdown',
    10,
    '{"label":"Vendor","data":"VENDOR","root_1":"_HEADER,_LINE","root_2":"ENTITY","root_3":"entity_2_id"}',
    '[5008]',
    '[601]',
    '[7002]',
    '{"validation":{"required": true},"options":[{"label":"Select Vendor","value":""}]}'
  ),
  (
    7105,
    7105,
    'CONTROL',
    'tender_category',
    'text',
    10,
    '{"label":"Tender Category","root_1":"_HEADER,_LINE","root_2":"OTHER_OBJECT","root_3":"tender_category_id"}',
    '[5001]',
    '[601]',
    '[7006]',
    NULL
  ),
  (
    7106,
    7106,
    'CONTROL',
    'expensetype',
    'select',
    10,
    '{"label":"Expense Type","root_1":"_HEADER","root_2":"TXN_INFO","root_3":"expense_type"}',
    '[5008]',
    '[601]',
    '[7002]',
    '{"validation":{"required": true},"options":[{"label":"Select Expense Type","value":""},{"label":"Main","value":"Main"},{"label":"Sub","value":"Sub"}]}'
  ),
  (
    7107,
    7107,
    'CONTROL',
    'quantity',
    'number',
    10,
    '{"label":"Quantity","root_1":"_LINE","root_2":"ITEM_QUANTITY"}',
    '[5008]',
    '[601]',
    '[7003]',
    '{"validation":{"required": true,"min":500,"max": 1000}}'
  ),
  (
    7108,
    7108,
    'CONTROL',
    'unit_price',
    'number',
    10,
    '{"label":"Unit Price","root_1":"_LINE","root_2":"ITEM_UNIT_AMOUNT"}',
    '[5008]',
    '[601]',
    '[7003]',
    '{"validation":{"required": true}}'
  ),
  (
    7109,
    7109,
    'CONTROL',
    'total',
    'number',
    10,
    '{"label":"Total","root_1":"_LINE","root_2":"ITEM_TOTAL_AMOUNT"}',
    '[5008]',
    '[601]',
    '[7003]',
    '{"compute":{"operator":"multiply","withField":["unit_price","quantity"]}}'
  ),
  (
    7110,
    7110,
    'CONTROL',
    'vendor',
    'dropdown',
    10,
    '{"label":"Vendor","data":"VENDOR BY CITY","parent":"city","root_1":"_HEADER","root_2":"ENTITY","root_3":"entity_1_id"}',
    '[5008]',
    '[601]',
    '[7002]',
    '{"validation":{"required": true},"options":[{"label":"Select Vendor","value":""}]}'
  )