delete from WPP_ENTL_PRMSN_OVRD where ENTL_NM='CareMgmt-Orders-TestGraphing' and guid in (12345,98765,45678);
INSERT INTO WPP_ENTL_PRMSN_OVRD (WPP_ENTL_PRMSN_OVRD_IK,RGN,GUID,ENTL_PRMSN,ENTL_NM,ENTL_SRC_ID,PILOT_APP_NAME,CRTE_DT_TM,MOD_DT_TM)VALUES (null,'GGA','12345','DENY','CareMgmt-Orders-TestGraphing','KP_EBIZ','CareMgmt-Orders-TestGraphing',SYSTIMESTAMP,SYSTIMESTAMP);

INSERT INTO WPP_ENTL_PRMSN_OVRD (WPP_ENTL_PRMSN_OVRD_IK,RGN,GUID,ENTL_PRMSN,ENTL_NM,ENTL_SRC_ID,PILOT_APP_NAME,CRTE_DT_TM,MOD_DT_TM)VALUES (null,'GGA','12345','PERMIT','CareMgmt-Orders-TestGraphing','EPIC','CareMgmt-Orders-TestGraphing',SYSTIMESTAMP,SYSTIMESTAMP);

INSERT INTO WPP_ENTL_PRMSN_OVRD (WPP_ENTL_PRMSN_OVRD_IK,RGN,GUID,ENTL_PRMSN,ENTL_NM,ENTL_SRC_ID,PILOT_APP_NAME,CRTE_DT_TM,MOD_DT_TM)VALUES (null,'GGA','98765','DENY','CareMgmt-Orders-TestGraphing','KP_EBIZ','CareMgmt-Orders-TestGraphing',SYSTIMESTAMP,SYSTIMESTAMP);

INSERT INTO WPP_ENTL_PRMSN_OVRD (WPP_ENTL_PRMSN_OVRD_IK,RGN,GUID,ENTL_PRMSN,ENTL_NM,ENTL_SRC_ID,PILOT_APP_NAME,CRTE_DT_TM,MOD_DT_TM)VALUES (null,'GGA','98765','PERMIT','CareMgmt-Orders-TestGraphing','EPIC','CareMgmt-Orders-TestGraphing',SYSTIMESTAMP,SYSTIMESTAMP);

INSERT INTO WPP_ENTL_PRMSN_OVRD (WPP_ENTL_PRMSN_OVRD_IK,RGN,GUID,ENTL_PRMSN,ENTL_NM,ENTL_SRC_ID,PILOT_APP_NAME,CRTE_DT_TM,MOD_DT_TM)VALUES (null,'MRN','45678','DENY','CareMgmt-Orders-TestGraphing','KP_EBIZ','CareMgmt-Orders-TestGraphing',SYSTIMESTAMP,SYSTIMESTAMP);

INSERT INTO WPP_ENTL_PRMSN_OVRD (WPP_ENTL_PRMSN_OVRD_IK,RGN,GUID,ENTL_PRMSN,ENTL_NM,ENTL_SRC_ID,PILOT_APP_NAME,CRTE_DT_TM,MOD_DT_TM)VALUES (null,'MRN','45678','PERMIT','CareMgmt-Orders-TestGraphing','EPIC','CareMgmt-Orders-TestGraphing',SYSTIMESTAMP,SYSTIMESTAMP);

commit;