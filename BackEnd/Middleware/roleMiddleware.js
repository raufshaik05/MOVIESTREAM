const requireAdmin = (req, res, next) => {

    // Check whether user is logged in
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Please login first"
        });
    }

    // Check whether logged-in account is admin
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access only"
        });
    }

    // Admin → allow request
    next();
};

module.exports = requireAdmin;