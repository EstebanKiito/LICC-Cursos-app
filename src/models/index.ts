import User from './User';
import Account from './Account';
import Course from './Course';
import Material from './Material';
import Comment from './Comment';
import Like from './Like';
import Mention from './Mention';
import StudyTask from './StudyTask';
import CourseReview from './CourseReview';
import Friendship from './Friendship';
import Conversation from './Conversation';
import Message from './Message';
import ConversationParticipant from './ConversationParticipant';

// --- 1. AUTENTICACIÓN Y USUARIOS ---
User.hasMany(Account, { foreignKey: 'userId', as: 'accounts' });
Account.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// --- 2. ACADÉMICO Y MATERIALES ---
Course.hasMany(Material, { foreignKey: 'courseId', as: 'materials' });
Material.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

User.hasMany(Material, { foreignKey: 'userId', as: 'materials' });
Material.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// --- 3. SOCIAL: COMENTARIOS Y LIKES EN MATERIALES ---
Material.hasMany(Comment, { foreignKey: 'materialId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Material, { foreignKey: 'materialId', as: 'material' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Anidamiento de comentarios (Respuestas a un comentario principal)
Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'replies', onDelete: 'CASCADE' });
Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parentComment' });

// Likes (Multiuso: para materiales o comentarios)
Material.hasMany(Like, { foreignKey: 'materialId', as: 'likes', onDelete: 'CASCADE' });
Like.belongsTo(Material, { foreignKey: 'materialId', as: 'material' });

Comment.hasMany(Like, { foreignKey: 'commentId', as: 'likes', onDelete: 'CASCADE' });
Like.belongsTo(Comment, { foreignKey: 'commentId', as: 'comment' });

User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// --- 4. MENCIONES Y NOTIFICACIONES ---
User.hasMany(Mention, { foreignKey: 'userId', as: 'receivedMentions', onDelete: 'CASCADE' });
Mention.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// --- 5. TRACKER DE ESTUDIO (POMODORO Y TAREAS) ---
User.hasMany(StudyTask, { foreignKey: 'userId', as: 'studyTasks', onDelete: 'CASCADE' });
StudyTask.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Course.hasMany(StudyTask, { foreignKey: 'courseId', as: 'studyTasks' });
StudyTask.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// --- 6. RESEÑAS DE RAMOS Y PROFESORES ---
Course.hasMany(CourseReview, { foreignKey: 'courseId', as: 'reviews', onDelete: 'CASCADE' });
CourseReview.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

User.hasMany(CourseReview, { foreignKey: 'userId', as: 'reviews' });
CourseReview.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// --- 7. AMISTADES ---
User.hasMany(Friendship, { foreignKey: 'requesterId', as: 'sentFriendRequests', onDelete: 'CASCADE' });
User.hasMany(Friendship, { foreignKey: 'addresseeId', as: 'receivedFriendRequests', onDelete: 'CASCADE' });
Friendship.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
Friendship.belongsTo(User, { foreignKey: 'addresseeId', as: 'addressee' });

// --- 8. CHAT, MENSAJES Y GRUPOS ---
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages', onDelete: 'CASCADE' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });

User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

// Relación Muchos a Muchos para los Participantes de la Conversación
User.belongsToMany(Conversation, { through: ConversationParticipant, foreignKey: 'userId', as: 'conversations' });
Conversation.belongsToMany(User, { through: ConversationParticipant, foreignKey: 'conversationId', as: 'participants' });

// Exportamos todos los modelos listos para usarse
export {
  User,
  Account,
  Course,
  Material,
  Comment,
  Like,
  Mention,
  StudyTask,
  CourseReview,
  Friendship,
  Conversation,
  Message,
};