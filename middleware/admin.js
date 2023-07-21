module.exports = function(req, res, next) {
    try {
        if (!req.user.isAdmin) return res.status(403).send('Acces Denied');
        next();
    } catch (err) {
        console.error('Error in admin authorization middleware: ', err);
        throw err;
    }
};