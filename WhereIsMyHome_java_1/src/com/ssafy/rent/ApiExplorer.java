package com.ssafy.rent;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;



/**Open API를 통해 데이타 추출   
 *
 */
public class ApiExplorer {
    public static void main(String[] args) throws IOException {
//       // StringBuilder urlBuilder = new StringBuilder("http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade"); /*아파트 매매 URL*/
//       // StringBuilder urlBuilder = new StringBuilder("http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHTrade"); /*연립 다세대 매매 URL*/
//        StringBuilder urlBuilder = new StringBuilder("http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent"); /*아파트 전월세  URL*/
////    	StringBuilder urlBuilder = new StringBuilder("http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHRent"); /*연립 다세대 전월세URL*/
//        urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=VhV%2BKsNjBo0fEzXZKe%2Bvg%2B5ma5V6yRBggE7g%2BeUGz0SrYsZ%2FvVr7Kv70RHPzPJGqga%2Fk0DerMNhOzmPbSdd57g%3D%3D"); /*Service Key*/
//        urlBuilder.append("&" + URLEncoder.encode("LAWD_CD","UTF-8") + "=" + URLEncoder.encode("11110", "UTF-8")); /*동코드 검색*/
//        urlBuilder.append("&" + URLEncoder.encode("DEAL_YMD","UTF-8") + "=" + URLEncoder.encode("201912", "UTF-8")); /*거래 년월 검색*/

		Path file=Paths.get("C:"+File.separator+"Environment2.xml");
		
		try {
			if (!Files.exists(file)) {
				Files.createFile(file);
				System.out.println("파일이 생성");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
    	
    	
    	//String serviceUrl="http://apis.data.go.kr/6260000/EnvironmentalNosie/getNoiseInfo";
    	//String serviceKey="=oROX7FP%2BdQMrLZhV3ECvmW9igibkHhrwiz8kH2KdZWoleQw%2F2%2FVlEdrwralbOxafDz94MmZ5fB1Z3EJavGKFtg%3D%3D";
    	//web- 일반 인증키
		String serviceKey="6e6d58584f6163723630554b646864";
    	String serviceUrl="http://openAPI.jongno.go.kr:8088/"+ serviceKey +"/xml/JongnoListEnvGuideCheck/1/5";
    	
    	
    	StringBuilder urlBuilder = new StringBuilder(serviceUrl);
    	urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + serviceKey);
    	urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8"));
    	urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
    	
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/jdson");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        //StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            Files.write(file, line.getBytes(), StandardOpenOption.APPEND);
            Files.write(file, System.lineSeparator().getBytes(), StandardOpenOption.APPEND);
        }
        rd.close();
        conn.disconnect();
        //System.out.println(sb.toString());
    }
}