function splitMultiLine(str) {
	return str.split('\\n').filter(para => para);
}

export default splitMultiLine;