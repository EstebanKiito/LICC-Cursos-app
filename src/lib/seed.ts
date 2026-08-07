import sequelize from './db';
import { User, Course } from '../models';

async function runSeed() {
  try {
    console.log('🌱 Iniciando el proceso de Seeding...\n');
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');

    // 2. Crear Usuarios Base
    console.log('⏳ Poblando usuarios...');
    
    const [user1] = await User.findOrCreate({
      where: { email: 'esteban.ortega@ejemplo.com' },
      defaults: {
        name: 'Esteban Ortega',
        email: 'esteban.ortega@ejemplo.com',
        password: 'Admin123!LICCursos', 
        image: "https://avatars.githubusercontent.com/u/130420779?v=4"
      }
    });

    const [user2] = await User.findOrCreate({
      where: { email: 'estudiante.prueba@ejemplo.com' },
      defaults: {
        name: 'Estudiante de Prueba',
        email: 'estudiante.prueba@ejemplo.com',
        password: 'estudiante123',
      }
    });

    console.log(`✅ Usuarios listos: ${user1.get('name')} y ${user2.get('name')}`);

    // 3. Crear Ramos Base (Cursos)
    console.log('⏳ Poblando ramos...');

    const coursesData = [
      // Semestre 1
      { code: 'IIC1103', name: 'Introducción a la Programación', description: 'Introduction to Programming' },
      { code: 'IIC1001', name: 'Algoritmos y Sistemas Computacionales', description: 'Algorithms and Computer Systems' },
      { code: 'MAT1107', name: 'Introducción al Cálculo', description: 'Introduction to Calculus' },
      { code: 'MAT1207', name: 'Introducción al Álgebra y Geometría', description: 'Introduction to Algebra and Geometry' },
      
      // Semestre 2
      { code: 'IIC1253', name: 'Matemáticas Discretas', description: 'Discrete Mathematics' },
      { code: 'IIC2233', name: 'Programación Avanzada', description: 'Advanced Programming' },
      { code: 'IIC2343', name: 'Arquitectura de Computadores', description: 'Computer Architecture' },
      { code: 'MAT1610', name: 'Cálculo I', description: 'Calculus I' },
      
      // Semestre 3
      { code: 'IIC2133', name: 'Estructuras de Datos y Algoritmos', description: 'Data Structures and Algorithms' },
      { code: 'IIC2413', name: 'Bases de Datos', description: 'Databases' },
      { code: 'MAT1620', name: 'Cálculo II', description: 'Calculus II' },
      { code: 'MAT1203', name: 'Álgebra Lineal', description: 'Linear Algebra' },
      
      // Semestre 4
      { code: 'EYP1025', name: 'Modelos Probabilísticos', description: 'Probabilistic Models' },
      { code: 'IIC2143', name: 'Ingeniería de Software', description: 'Software Engineering' },
      { code: 'IIC2224', name: 'Autómatas y Compiladores', description: 'Automata and Compilers' },
      { code: 'IIC2333', name: 'Sistemas Operativos y Redes', description: 'Operating Systems and Networks' },
      
      // Semestre 5
      { code: 'IIC2560', name: 'Fundamentos de Lenguajes de Programación', description: 'Programming Languages Fundamentals' },
      { code: 'IIC2214', name: 'Teoría de la Computación', description: 'Theory of Computation' },
      { code: 'IIC2513', name: 'Tecnologías y Aplicaciones Web', description: 'Web Technologies and Applications' },
      
      // Semestre 6
      { code: 'IIC2613', name: 'Inteligencia Artificial', description: 'Artificial Intelligence' },
      { code: 'IIC2283', name: 'Diseño y Análisis de Algoritmos', description: 'Algorithm Design and Analysis' },
      { code: 'IIC2531', name: 'Seguridad Computacional', description: 'Computer Security' },
      { code: 'ETI1001', name: 'Ética para la Cs de la Computación', description: 'Ethics for Computer Science' },
      
      // Semestre 7
      { code: 'IIC2523', name: 'Sistemas Distribuidos', description: 'Distributed Systems' },
      { code: 'IIC2182', name: 'Interfaces y Experiencia de Usuario', description: 'User Interfaces and Experience' },
      
      // Semestre 8
      { code: 'IIC2164', name: 'Proyecto de Innovación y Computación', description: 'Innovation and Computing Project' },

      // Optativos y Ofgs
      { code: 'FIL2001', name: 'Filosofía: ¿Para qué?', description: 'Philosophy'},
      

    ];

    for (const course of coursesData) {
      // Asumiendo que tu modelo Course tiene un campo 'code' o 'name' único
      await Course.findOrCreate({
        where: { code: course.code }, 
        defaults: course
      });
    }

    console.log(`✅ Ramos listos: Se insertaron/verificaron ${coursesData.length} cursos.`);

    console.log('\n🚀 ¡Seeding completado con éxito!');

  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
  } finally {
    // Es muy importante cerrar la conexión al terminar, o el script se quedará "colgado" en la terminal
    await sequelize.close();
    process.exit(0);
  }
}

runSeed();