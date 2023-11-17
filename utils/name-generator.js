function generateRandomFileName(originalFileName) {
	const timestamp = new Date().getTime();
	const randomString = Math.random().toString(36).substring(2, 8);

	const fileExtension = originalFileName.split('.').pop();
	const randomFileName = `${timestamp}_${randomString}.${fileExtension}`;

	return randomFileName;
}

module.exports = generateRandomFileName;
