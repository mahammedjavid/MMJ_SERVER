function validatePayload(payload, requiredFields) {
  const missingFields = [];

  for (const field of requiredFields) {
    if (!payload[field]) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    const errorMessage = `${missingFields.join(", ")} ${
      missingFields.length > 1 ? "are" : "is"
    } required`;
    throw new Error(errorMessage);
  }
}

module.exports = {
  validatePayload,
};
