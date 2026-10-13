import dotenv from 'dotenv';
dotenv.config();

import { connectDB, disconnectDB } from '../src/config/db.js';
import { AdminUser } from '../src/models/AdminUser.js';

const createAdmin = async () => {
  try {
    await connectDB();

    const email = process.argv[2] || process.env.ADMIN_EMAIL || 'admin@abdurrahmankhan.com';
    const password = process.argv[3] || process.env.ADMIN_PASSWORD || 'AdminSecurePass2026!';

    console.log(`\n========================================`);
    console.log(`🔐 CREATING ADMINISTRATOR ACCOUNT`);
    console.log(`Email: ${email}`);
    console.log(`========================================\n`);

    const existingAdmin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    const passwordHash = await AdminUser.hashPassword(password);

    if (existingAdmin) {
      existingAdmin.passwordHash = passwordHash;
      await existingAdmin.save();
      console.log(`✅ Admin account '${email}' already existed. Password updated successfully.`);
    } else {
      await AdminUser.create({
        email: email.toLowerCase().trim(),
        passwordHash,
        name: 'Abdur Rahman Khan',
        role: 'superadmin',
      });
      console.log(`✅ Administrator account '${email}' created successfully!`);
    }

    console.log(`\nCredentials for login:`);
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}\n`);
  } catch (error) {
    console.error('❌ Error creating administrator:', error.message);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
};

createAdmin();

