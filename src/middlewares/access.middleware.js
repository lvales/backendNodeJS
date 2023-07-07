// Verifica si el usuario no ha iniciado sesión
export const publicAccess = (req, res, next) => {
   if (req.session.user) return res.redirect('/products');
   next();
};
export const publicAccessApi = (req, res, next) => {
   if (req.session.user) return res.send({ status: 401, message: 'Unauthorized' });
   next();
};
// Verifica si el usuario ha iniciado sesión
export const privateAccess = (req, res, next) => {
   if (!req.session.user) return res.redirect('/');
   next();
};
export const privateAccessApi = (req, res, next) => {
   if (!req.session.user) return res.send({ status: 401, message: 'Unauthorized' });
   next();
};
// Verifica si el usuario tiene acceso de administrador
export const adminAccess = (req, res, next) => {
   if (!req.session.user) return res.redirect('/');
   if (req.session.user.rol !== 'admin') return res.redirect('/products');
   next();
};
export const adminAccessApi = (req, res, next) => {
   if (!req.session.user) return res.redirect('/');
   if (req.session.user.rol !== 'admin') return res.send({ status: 401, message: 'Unauthorized' });
   next();
};
//Solo user
export const userAccess = (req, res, next) => {
   if (!req.session.user) return res.redirect('/');
   if (req.session.user.rol !== 'user') return res.redirect('/products');
   next();
};
export const userAccessApi = (req, res, next) => {
   if (!req.session.user) return res.send({ status: 401, message: 'Unauthorized' });
   if (req.session.user.rol !== 'user') ;
   next();
};
