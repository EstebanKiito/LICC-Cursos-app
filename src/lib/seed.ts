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
      { code: 'IIC1103', name: 'Introducción a la Programación', description: 'Introduction to Programming', prerequisites: null, credits: 10, parity: 'both', type: 'dcc' },
      { code: 'IIC1001', name: 'Algoritmos y Sistemas Computacionales', description: 'Algorithms and Computer Systems', prerequisites: null, credits: 5, parity: 'odd', type: 'dcc' },
      { code: 'MAT1107', name: 'Introducción al Cálculo', description: 'Introduction to Calculus', prerequisites: null, credits: 10, parity: 'both', type: 'fmat' },
      { code: 'MAT1207', name: 'Introducción al Álgebra y Geometría', description: 'Introduction to Algebra and Geometry', prerequisites: null, credits: 10, parity: 'both', type: 'fmat' },
      
      // Semestre 2
      { code: 'IIC1253', name: 'Matemáticas Discretas', description: 'Discrete Mathematics', prerequisites: 'MAT1203 o IMT2210 o (IIC1001 y MAT1207)', credits: 10, parity: 'both', type: 'dcc' },
      { code: 'IIC2233', name: 'Programación Avanzada', description: 'Advanced Programming', prerequisites: 'IIC1103 o IIC1102', credits: 10, parity: 'both', type: 'dcc' },
      { code: 'IIC2343', name: 'Arquitectura de Computadores', description: 'Computer Architecture', prerequisites: 'IIC2233(c)', credits: 10, parity: 'both', type: 'dcc' },
      { code: 'MAT1610', name: 'Cálculo I', description: 'Calculus I', prerequisites: 'MAT1000 o MAT1107', credits: 10, parity: 'both', type: 'fmat' },
      
      // Semestre 3
      { code: 'IIC2133', name: 'Estructuras de Datos y Algoritmos', description: 'Data Structures and Algorithms', prerequisites: '(IIC1253 y IIC2233) o ICS2122 o IRB2002 o IDI2025 o IBM2123 o IIC2154', credits: 10, parity: 'both', type: 'dcc' },
      { code: 'IIC2413', name: 'Bases de Datos', description: 'Databases', prerequisites: 'IIC2233 o (IIC1222 y IIC2252) o ICS2122 o IRB2002 o IDI2025 o IBM2123', credits: 10, parity: 'both', type: 'dcc' },
      { code: 'MAT1620', name: 'Cálculo II', description: 'Calculus II', prerequisites: 'MAT1610', credits: 10, parity: 'both', type: 'fmat' },
      { code: 'MAT1203', name: 'Álgebra Lineal', description: 'Linear Algebra', prerequisites: 'MAT1600 o MAT1207', credits: 10, parity: 'both', type: 'fmat' },
      
      // Semestre 4
      { code: 'EYP1025', name: 'Modelos Probabilísticos', description: 'Probabilistic Models', prerequisites: '(EYP1015 y MAT1135) o (EYP1015 y MAT1630) o (IMT2220 y IMT2230) o (IIC1253 y MAT1620)', credits: 10, parity: 'both', type: 'fmat' },
      { code: 'IIC2143', name: 'Ingeniería de Software', description: 'Software Engineering', prerequisites: 'IIC2413 o ICS2122 o IRB2002 o IDI2025 o IBM2123', credits: 10, parity: 'both', type: 'dcc' },
      { code: 'IIC2224', name: 'Autómatas y Compiladores', description: 'Automata and Compilers', prerequisites: '(IIC1253 o IIC2252) y (IIC2133 o IIC2132)', credits: 10, parity: 'both', type: 'major' },
      { code: 'IIC2333', name: 'Sistemas Operativos y Redes', description: 'Operating Systems and Networks', prerequisites: 'IIC2343', credits: 10, parity: 'both', type: 'major' },
      
      // Semestre 5
      { code: 'IIC2560', name: 'Fundamentos de Lenguajes de Programación', description: 'Programming Languages Fundamentals', prerequisites: '(IIC2343 o IIC2342) y (IIC2224 o IIC2223)', credits: 10, parity: 'odd', type: 'major' },
      { code: 'IIC2214', name: 'Teoría de la Computación', description: 'Theory of Computation', prerequisites: 'IIC1253 o IIC2252', credits: 10, parity: 'odd', type: 'major' },
      { code: 'IIC2513', name: 'Tecnologías y Aplicaciones Web', description: 'Web Technologies and Applications', prerequisites: 'IIC2143 o ICS2122 o IRB2002 o IDI2025 o IBM2123', credits: 10, parity: 'both', type: 'major' },
      
      // Semestre 6
      { code: 'IIC2613', name: 'Inteligencia Artificial', description: 'Artificial Intelligence', prerequisites: '(EYP1113 y IIC2233) o (EYP1025 y IIC2233) o (AST0212 y IIC2233) o ICS2122 o IRB2002 o IDI2025 o IBM2123', credits: 10, parity: 'both', type: 'major' },
      { code: 'IIC2283', name: 'Diseño y Análisis de Algoritmos', description: 'Algorithm Design and Analysis', prerequisites: 'IIC2133 o (IIC2132 y IIC2212) o ICS2122 o IRB2002 o IDI2025 o IBM2123', credits: 10, parity: 'both', type: 'major' },
      { code: 'IIC2531', name: 'Seguridad Computacional', description: 'Computer Security', prerequisites: '(IIC2333 o IIC2512) o (IIC2133 o IIC2132)', credits: 10, parity: 'both', type: 'major' },
      { code: 'ETI1001', name: 'Ética para la Cs de la Computación', description: 'Ethics for Computer Science', prerequisites: '(IIC2143 o IIC2142) y IIC2513', credits: 10, parity: 'both', type: 'eti' },
      
      // Semestre 7
      { code: 'IIC2523', name: 'Sistemas Distribuidos', description: 'Distributed Systems', prerequisites: 'IIC2333 o (IIC1222 y IIC2342) o ICS2122 o IRB2002 o IDI2025 o IBM2123 o IIC2154', credits: 10, parity: 'both', type: 'major' },
      { code: 'IIC2182', name: 'Interfaces y Experiencia de Usuario', description: 'User Interfaces and Experience', prerequisites: 'IIC2513', credits: 10, parity: 'odd', type: 'major' },
      
      // Semestre 8
      { code: 'IIC2164', name: 'Proyecto de Innovación y Computación', description: 'Innovation and Computing Project', prerequisites: 'ETI1001 y IIC2182 y IIC2531', credits: 10, parity: 'even', type: 'dcc' },

      // OFG y OPT
      { code: 'FIL2001', name: 'Filosofía: ¿Para Qué?', description: 'Philosophy', prerequisites: null, credits: 10, parity: 'both', type: 'ofg' },
      { code: 'AST101', name: "Un Paseo por el Universo", description: "A Walk Through the Universe", prerequisites: null, credits: 10, parity: 'both', type: 'ofg' },
      { code: 'IIC2026', name: 'Visualización de Información', description: 'Information Visualization', prerequisites: 'IIC1103 o IIC1102', credits: 10, parity: null, type: 'opt' },
      { code: 'IIC2433', name: 'Minería de Datos', description: 'Data Mining', prerequisites: '(EYP1113 y IIC1102 y MAT1203) o (EYP1025 y IIC1103 y IMT2210) o (EYP1025 y IIC1103 y MAT1203)', credits: 10, parity: null, type: 'opt' },
      { code: 'IIC2113', name: 'Diseño Detallado de Software', description: 'Detailed Software Design', prerequisites: 'IIC2142 o IIC2143', credits: 10, parity: null, type: 'opt' },
      { code: 'IIC2173', name: 'Arquitectura de Sistemas de Software', description: 'Software Systems Architecture', prerequisites: 'IIC2142 o IIC2143', credits: 10, parity: null, type: 'opt' },
      { code: 'IIC2293', name: 'Algoritmos Avanzados', description: 'Advanced Algorithms', prerequisites: 'IIC2283 o IIC3222', credits: 10, parity: null, type: 'opt' },
      { code: 'IIC2714', name: 'Fundamentos de Procesamiento de Imagenes', description: 'Fundamentals of Image Processing', prerequisites: null, credits: 10, parity: null, type: 'opt' }
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