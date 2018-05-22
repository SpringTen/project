package com.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.util.Streams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.util.PathUtils;

@Controller
@RequestMapping(value="imageController")
public class ImageController {
	
	@ResponseBody
	@RequestMapping(value = "readImage")
	public String readImage(HttpServletRequest request,
			HttpServletResponse response, String name) throws IOException {
		FileInputStream fis = null;
		OutputStream os = null;
		try {
			fis = new FileInputStream(PathUtils.IMAGE_PATH + name);
			os = response.getOutputStream();
			Streams.copy(fis, os, false, new byte[1024]);
		} catch (Exception e) {
		} finally {
			os.close();
			fis.close();
		}
		return "ok";
	}
}
