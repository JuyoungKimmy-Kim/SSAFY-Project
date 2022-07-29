package com.ssafy.rent.util;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

import com.ssafy.rent.model.dto.EnvironmentInfo;

public class EnviornmentHandler extends DefaultHandler{
	
	private List<EnvironmentInfo> envirList=new ArrayList<>();

	//private HomeDeal home;

	private EnvironmentInfo env;
	private String data;
	
	@Override
	public void startElement(String uri, String localName
			                           , String qName, Attributes att ){
		if(qName.equals("item")){
			env=new EnvironmentInfo();
		}
	}
	@Override
	public void endElement(String uri, String localName, String qName){
		switch (qName) {
		case "WRKP_NM" : env.setWrkp_nm(data); break;
		case "APV_PERM_MGT_NO" : env.setApv_perm_mgt_no(data); break;
		case "UPCH_COB_CODE" : env.setUpch_cob_code(Integer.parseInt(data)); break;
		case "UPCH_COB_NM" : env.setUpch_cob_nm(data); break;
		case "DRT_INSP_YMD" : env.setDrt_insp_ymd(Integer.parseInt(data)); break;
		case "ORG_AND_TEAM_CODE" : env.setOrg_and_team_code(Integer.parseInt(data));break;
		case "SF_TEAM_NM" : env.setSf_team_nm(data); break;
		case "DRT_INSP_SE_NM" : env.setDrt_insp_se_nm(data); break;
		case "DISPO_TGT_YN" : env.setDispo_tgt_yn(data);break;
		case "DRT_INSP_ITEM" : env.setDrt_insp_item(data);break;
		case "WRKP_ADDR" : env.setWrkp_addr(data); break;
		
		}
	}
	
	@Override
	public void characters(char[]ch, int start, int length){
		this.data=new String(ch, start, length);
	}
	public List<EnvironmentInfo> getEnvirList() {
		return envirList;
	}
	public void setEnvirList(List<EnvironmentInfo> envirList) {
		this.envirList = envirList;
	}
	public EnvironmentInfo getEnv() {
		return env;
	}
	public void setEnv(EnvironmentInfo env) {
		this.env = env;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	
	
}
