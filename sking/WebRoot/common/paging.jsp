<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script type="text/javascript">
	function goPage(pageNo){
		
	}
</script>
<form id="page_p" name="page_p" method="post">
<input type="hidden" name="page_totalRecords" value="${paging.totalRecords}"/>
<input type="hidden" name="page_pageCount" value="${paging.pageCount}"/>
<input type="hidden" name="page_totalRecords" value="${paging.totalRecords}"/>

<table cellspacing="0" cellpadding="0" border="0" width="95%"
	style="margin-top: 8px">
	<tr>
		<td nowrap="nowrap" style="color: #00009C" align="center">

		共${paging.totalRecords }条${paging.totalPages }页
		第${paging.pageNo }页&nbsp;&nbsp; <c:choose>
			<c:when test="${paging.pageNo == 1}">
				<img alt="首页" border="0"
					src="../resources/images/paging/firstPageDisabled.gif">
			</c:when>
			<c:otherwise>
				<a href="javascript:goPage(1)"><img alt="首页" border="0"
					src="../resources/images/paging/firstPage.gif" />
				</a>
			</c:otherwise>
		</c:choose> <c:choose>
			<c:when test="${paging.pageNo == 1}">
				<img alt="上一页" border="0"
					src="../resources/images/paging/prevPageDisabled.gif">
			</c:when>
			<c:otherwise>
				<a href="javascript:goPage(${paging.pageNo-1 })"><img
					alt="上一页" border="0"
					src="../resources/images/paging/prevPage.gif" />
				</a>
			</c:otherwise>
		</c:choose> <c:choose>
			<c:when test="${paging.pageNo + 1 > paging.totalPages}">
				<img alt="下一页" border="0"
					src="../resources/images/paging/nextPageDisabled.gif">
			</c:when>
			<c:otherwise>
				<a href="javascript:goPage(${paging.pageNo+1 })"><img
					alt="下一页" border="0"
					src="../resources/images/paging/nextPage.gif">
				</a>
			</c:otherwise>
		</c:choose> <c:choose>
			<c:when test="${paging.pageNo == paging.totalPages}">
				<img alt="末页" border="0"
					src="../resources/images/paging/lastPageDisabled.gif">
			</c:when>
			<c:otherwise>
				<a href="javascript:goPage(${paging.totalPages})"><img
					alt="末页" border="0"
					src="../resources/images/paging/lastPage.gif">
				</a>
			</c:otherwise>
		</c:choose> &nbsp;&nbsp;<img onclick="goPage1(trim(txtGoPage.value))" alt="跳转"
			border="0"
			src="../resources/images/paging/gotoPage.gif"
			id="imgJump" /> <input size="3" name="txtGoPage" type="text"
			value="${paging.pageNo }" /> /${paging.totalPages}页&nbsp;
		&nbsp;</td>
	</tr>
</table>
</form>