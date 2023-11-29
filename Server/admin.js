const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.models'); // Asegúrate de reemplazar con la ruta correcta a tu modelo de User

async function createAdminUser() {
    try {
        await mongoose.connect('mongodb://localhost:27017/cursosApp', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado a la base de datos.');

        const hashedPassword = await bcrypt.hash('12345', 10); // Reemplaza 'tuContraseñaSegura' con la contraseña deseada

        const adminUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            profilePicture: 'https://blogs.stthom.edu/wp-content/uploads/2022/03/BeYourBold_Blog_NetworkAdministrator-1024x684.jpg',
            address: '1234 Admin Street, Admin City',
            role: 'admin'
        });

        await adminUser.save();
        console.log('Usuario administrador creado con éxito.');
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Desconectado de la base de datos.');
    }
}

createAdminUser();