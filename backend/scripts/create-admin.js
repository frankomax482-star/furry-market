import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/furry_market';
    await mongoose.connect(mongoUri);
    
    const hashedPassword = await bcrypt.hash('admin123456', 10);
    
    // Проверяем есть ли уже админ
    const existingAdmin = await User.findOne({ email: 'admin@furrymarket.ru' });
    if (existingAdmin) {
      console.log('✅ Админ аккаунт уже существует');
      console.log('📧 Email: admin@furrymarket.ru');
      console.log('🔑 Password: admin123456');
      process.exit(0);
    }
    
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'FURRY MARKET',
      email: 'admin@furrymarket.ru',
      phone: '+7 (999) 999-99-99',
      password: hashedPassword,
      role: 'admin'
    });
    
    await adminUser.save();
    
    console.log('✅ Админ аккаунт создан!');
    console.log('📧 Email: admin@furrymarket.ru');
    console.log('🔑 Password: admin123456');
    console.log('\n⚠️  ВАЖНО: Измените пароль после первого входа!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

createAdminUser();
