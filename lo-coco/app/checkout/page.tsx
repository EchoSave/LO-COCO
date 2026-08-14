await fetch("/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    userId,
    items,
    total,
    status: "Pending"
  })
});