// Verifica si el usuario no ha iniciado sesión
export const publicAccess = (req, res, next) => {
   if (req.session.user) return res.redirect('/products');
   next();
};
// Verifica si el usuario ha iniciado sesión
export const privateAccess = (req, res, next) => {
   if (!req.session.user) return res.redirect('/');
   next();
};
// Verifica si el usuario tiene acceso de administrador
export const adminAccess = (req, res, next) => {
   if (req.session.user.rol !== 'admin') return res.redirect('/products');
   next();
};