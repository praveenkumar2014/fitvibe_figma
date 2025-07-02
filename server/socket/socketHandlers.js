export const handleSocketConnection = (socket, io) => {
  console.log('👤 User connected:', socket.id);

  // Join user to their personal room
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`👤 User ${userId} joined personal room`);
  });

  // Join consultation room
  socket.on('join-consultation', (consultationId) => {
    socket.join(`consultation-${consultationId}`);
    console.log(`📹 User joined consultation: ${consultationId}`);
    
    // Notify other participants
    socket.to(`consultation-${consultationId}`).emit('user-joined-consultation', {
      userId: socket.userId,
      timestamp: new Date()
    });
  });

  // Leave consultation room
  socket.on('leave-consultation', (consultationId) => {
    socket.leave(`consultation-${consultationId}`);
    console.log(`📹 User left consultation: ${consultationId}`);
    
    // Notify other participants
    socket.to(`consultation-${consultationId}`).emit('user-left-consultation', {
      userId: socket.userId,
      timestamp: new Date()
    });
  });

  // Handle consultation messages
  socket.on('consultation-message', (data) => {
    const { consultationId, message, sender } = data;
    
    // Broadcast message to consultation room
    io.to(`consultation-${consultationId}`).emit('consultation-message', {
      id: Date.now(),
      consultationId,
      message,
      sender,
      timestamp: new Date()
    });
  });

  // Handle video call events
  socket.on('video-call-offer', (data) => {
    const { consultationId, offer, targetUserId } = data;
    
    socket.to(`user-${targetUserId}`).emit('video-call-offer', {
      consultationId,
      offer,
      fromUserId: socket.userId
    });
  });

  socket.on('video-call-answer', (data) => {
    const { consultationId, answer, targetUserId } = data;
    
    socket.to(`user-${targetUserId}`).emit('video-call-answer', {
      consultationId,
      answer,
      fromUserId: socket.userId
    });
  });

  socket.on('ice-candidate', (data) => {
    const { consultationId, candidate, targetUserId } = data;
    
    socket.to(`user-${targetUserId}`).emit('ice-candidate', {
      consultationId,
      candidate,
      fromUserId: socket.userId
    });
  });

  // Handle order updates
  socket.on('track-order', (orderId) => {
    socket.join(`order-${orderId}`);
    console.log(`📦 User tracking order: ${orderId}`);
  });

  // Handle real-time notifications
  socket.on('subscribe-notifications', (userId) => {
    socket.join(`notifications-${userId}`);
    console.log(`🔔 User subscribed to notifications: ${userId}`);
  });

  // Handle trainer availability updates
  socket.on('trainer-status-update', (data) => {
    const { trainerId, status, availability } = data;
    
    // Broadcast to all users interested in this trainer
    io.emit('trainer-status-changed', {
      trainerId,
      status,
      availability,
      timestamp: new Date()
    });
  });

  // Handle live workout sessions
  socket.on('join-live-workout', (workoutId) => {
    socket.join(`workout-${workoutId}`);
    console.log(`💪 User joined live workout: ${workoutId}`);
    
    // Notify other participants
    socket.to(`workout-${workoutId}`).emit('user-joined-workout', {
      userId: socket.userId,
      timestamp: new Date()
    });
  });

  socket.on('workout-progress', (data) => {
    const { workoutId, progress } = data;
    
    // Broadcast progress to workout room
    socket.to(`workout-${workoutId}`).emit('workout-progress-update', {
      userId: socket.userId,
      progress,
      timestamp: new Date()
    });
  });

  // Handle chat messages
  socket.on('send-message', (data) => {
    const { recipientId, message, type = 'text' } = data;
    
    // Send message to recipient
    io.to(`user-${recipientId}`).emit('new-message', {
      id: Date.now(),
      senderId: socket.userId,
      message,
      type,
      timestamp: new Date()
    });
  });

  // Handle typing indicators
  socket.on('typing-start', (data) => {
    const { recipientId, consultationId } = data;
    
    if (consultationId) {
      socket.to(`consultation-${consultationId}`).emit('user-typing', {
        userId: socket.userId,
        isTyping: true
      });
    } else {
      socket.to(`user-${recipientId}`).emit('user-typing', {
        userId: socket.userId,
        isTyping: true
      });
    }
  });

  socket.on('typing-stop', (data) => {
    const { recipientId, consultationId } = data;
    
    if (consultationId) {
      socket.to(`consultation-${consultationId}`).emit('user-typing', {
        userId: socket.userId,
        isTyping: false
      });
    } else {
      socket.to(`user-${recipientId}`).emit('user-typing', {
        userId: socket.userId,
        isTyping: false
      });
    }
  });

  // Handle location updates for delivery tracking
  socket.on('delivery-location-update', (data) => {
    const { orderId, location, status } = data;
    
    // Broadcast to order tracking room
    io.to(`order-${orderId}`).emit('delivery-update', {
      location,
      status,
      timestamp: new Date()
    });
  });

  // Handle admin broadcasts
  socket.on('admin-broadcast', (data) => {
    const { message, targetRole, targetUsers } = data;
    
    if (targetRole) {
      // Broadcast to all users with specific role
      io.emit('admin-notification', {
        message,
        targetRole,
        timestamp: new Date()
      });
    } else if (targetUsers) {
      // Broadcast to specific users
      targetUsers.forEach(userId => {
        io.to(`user-${userId}`).emit('admin-notification', {
          message,
          timestamp: new Date()
        });
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('👤 User disconnected:', socket.id);
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
};

// Utility functions for sending notifications
export const sendNotificationToUser = (io, userId, notification) => {
  io.to(`user-${userId}`).emit('notification', {
    ...notification,
    timestamp: new Date()
  });
};

export const sendOrderUpdate = (io, orderId, update) => {
  io.to(`order-${orderId}`).emit('order-update', {
    ...update,
    timestamp: new Date()
  });
};

export const broadcastToRole = (io, role, message) => {
  io.emit('role-broadcast', {
    targetRole: role,
    message,
    timestamp: new Date()
  });
};