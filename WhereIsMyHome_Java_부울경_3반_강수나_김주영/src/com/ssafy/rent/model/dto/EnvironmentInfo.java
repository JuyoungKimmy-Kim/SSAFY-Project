package com.ssafy.rent.model.dto;

public class EnvironmentInfo {
    private String wrkp_nm; //업체(시설)명
    private String apv_perm_mgt_no; //인허가번호
    private int upch_cob_code; //업종코드
    private String upch_cob_nm; //업종명
    private int drt_insp_ymd; //지도점검일자
    private int org_and_team_code; //점검기관
    private String sf_team_nm; //점검기관명
    private String drt_insp_se_nm; //지도점검구분
    private String dispo_tgt_yn; //처분대상여부
    private String drt_insp_item; //점검사항
    private String drt_insp_rt_dtl; //점검결과
    private String wrkp_naddr; //소재지도로명주소
    private String wrkp_addr; //소재지주소
    
    
    
    public EnvironmentInfo(String wrkp_nm, String apv_perm_mgt_no, int upch_cob_code, String upch_cob_nm,
            int drt_insp_ymd, int org_and_team_code, String sf_team_nm, String drt_insp_se_nm, String dispo_tgt_yn,
            String drt_insp_item, String drt_insp_rt_dtl, String wrkp_naddr, String wrkp_addr) {
        super();
        this.wrkp_nm = wrkp_nm;
        this.apv_perm_mgt_no = apv_perm_mgt_no;
        this.upch_cob_code = upch_cob_code;
        this.upch_cob_nm = upch_cob_nm;
        this.drt_insp_ymd = drt_insp_ymd;
        this.org_and_team_code = org_and_team_code;
        this.sf_team_nm = sf_team_nm;
        this.drt_insp_se_nm = drt_insp_se_nm;
        this.dispo_tgt_yn = dispo_tgt_yn;
        this.drt_insp_item = drt_insp_item;
        this.drt_insp_rt_dtl = drt_insp_rt_dtl;
        this.wrkp_naddr = wrkp_naddr;
        this.wrkp_addr = wrkp_addr;
    }



    public EnvironmentInfo() {
    }



    public String getWrkp_nm() {
        return wrkp_nm;
    }



    public void setWrkp_nm(String wrkp_nm) {
        this.wrkp_nm = wrkp_nm;
    }



    public String getApv_perm_mgt_no() {
        return apv_perm_mgt_no;
    }



    public void setApv_perm_mgt_no(String apv_perm_mgt_no) {
        this.apv_perm_mgt_no = apv_perm_mgt_no;
    }



    public int getUpch_cob_code() {
        return upch_cob_code;
    }



    public void setUpch_cob_code(int upch_cob_code) {
        this.upch_cob_code = upch_cob_code;
    }



    public String getUpch_cob_nm() {
        return upch_cob_nm;
    }



    public void setUpch_cob_nm(String upch_cob_nm) {
        this.upch_cob_nm = upch_cob_nm;
    }



    public int getDrt_insp_ymd() {
        return drt_insp_ymd;
    }



    public void setDrt_insp_ymd(int drt_insp_ymd) {
        this.drt_insp_ymd = drt_insp_ymd;
    }



    public int getOrg_and_team_code() {
        return org_and_team_code;
    }



    public void setOrg_and_team_code(int org_and_team_code) {
        this.org_and_team_code = org_and_team_code;
    }



    public String getSf_team_nm() {
        return sf_team_nm;
    }



    public void setSf_team_nm(String sf_team_nm) {
        this.sf_team_nm = sf_team_nm;
    }



    public String getDrt_insp_se_nm() {
        return drt_insp_se_nm;
    }



    public void setDrt_insp_se_nm(String drt_insp_se_nm) {
        this.drt_insp_se_nm = drt_insp_se_nm;
    }



    public String getDispo_tgt_yn() {
        return dispo_tgt_yn;
    }



    public void setDispo_tgt_yn(String dispo_tgt_yn) {
        this.dispo_tgt_yn = dispo_tgt_yn;
    }



    public String getDrt_insp_item() {
        return drt_insp_item;
    }



    public void setDrt_insp_item(String drt_insp_item) {
        this.drt_insp_item = drt_insp_item;
    }



    public String getDrt_insp_rt_dtl() {
        return drt_insp_rt_dtl;
    }



    public void setDrt_insp_rt_dtl(String drt_insp_rt_dtl) {
        this.drt_insp_rt_dtl = drt_insp_rt_dtl;
    }



    public String getWrkp_naddr() {
        return wrkp_naddr;
    }



    public void setWrkp_naddr(String wrkp_naddr) {
        this.wrkp_naddr = wrkp_naddr;
    }



    public String getWrkp_addr() {
        return wrkp_addr;
    }



    public void setWrkp_addr(String wrkp_addr) {
        this.wrkp_addr = wrkp_addr;
    }



    @Override
    public String toString() {
        return "EnvironmentInfo [wrkp_nm=" + wrkp_nm + ", apv_perm_mgt_no=" + apv_perm_mgt_no + ", upch_cob_code="
                + upch_cob_code + ", upch_cob_nm=" + upch_cob_nm + ", drt_insp_ymd=" + drt_insp_ymd
                + ", org_and_team_code=" + org_and_team_code + ", sf_team_nm=" + sf_team_nm + ", drt_insp_se_nm="
                + drt_insp_se_nm + ", dispo_tgt_yn=" + dispo_tgt_yn + ", drt_insp_item=" + drt_insp_item
                + ", drt_insp_rt_dtl=" + drt_insp_rt_dtl + ", wrkp_naddr=" + wrkp_naddr + ", wrkp_addr=" + wrkp_addr
                + "]";
    }
    
    
}