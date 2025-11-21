console.log("🟢 test.js is starting...");

try {
    const express = require('express');
    console.log("✅ Express loaded successfully");
    
    const app = express();
    const PORT = 3000;
    
    app.get('/', (req, res) => {
        res.send('Hello World! Test successful!');
    });
    
    app.listen(PORT, () => {
        console.log(`✅ Test server running on http://localhost:${PORT}`);
    });
    
} catch (error) {
    console.log("❌ Error:", error.message);
}