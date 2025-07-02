import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;

  connect(userId: string) {
    if (this.socket?.connected) {
      return;
    }

    this.userId = userId;
    this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to server');
      this.joinUserRoom(userId);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
    }
  }

  // User rooms
  joinUserRoom(userId: string) {
    this.socket?.emit('join-user-room', userId);
  }

  subscribeToNotifications(userId: string) {
    this.socket?.emit('subscribe-notifications', userId);
  }

  // Consultation methods
  joinConsultation(consultationId: string) {
    this.socket?.emit('join-consultation', consultationId);
  }

  leaveConsultation(consultationId: string) {
    this.socket?.emit('leave-consultation', consultationId);
  }

  sendConsultationMessage(consultationId: string, message: string, sender: any) {
    this.socket?.emit('consultation-message', {
      consultationId,
      message,
      sender
    });
  }

  onConsultationMessage(callback: (data: any) => void) {
    this.socket?.on('consultation-message', callback);
  }

  // Video call methods
  sendVideoCallOffer(consultationId: string, offer: any, targetUserId: string) {
    this.socket?.emit('video-call-offer', {
      consultationId,
      offer,
      targetUserId
    });
  }

  sendVideoCallAnswer(consultationId: string, answer: any, targetUserId: string) {
    this.socket?.emit('video-call-answer', {
      consultationId,
      answer,
      targetUserId
    });
  }

  sendIceCandidate(consultationId: string, candidate: any, targetUserId: string) {
    this.socket?.emit('ice-candidate', {
      consultationId,
      candidate,
      targetUserId
    });
  }

  onVideoCallOffer(callback: (data: any) => void) {
    this.socket?.on('video-call-offer', callback);
  }

  onVideoCallAnswer(callback: (data: any) => void) {
    this.socket?.on('video-call-answer', callback);
  }

  onIceCandidate(callback: (data: any) => void) {
    this.socket?.on('ice-candidate', callback);
  }

  // Order tracking
  trackOrder(orderId: string) {
    this.socket?.emit('track-order', orderId);
  }

  onOrderUpdate(callback: (data: any) => void) {
    this.socket?.on('order-update', callback);
  }

  onDeliveryUpdate(callback: (data: any) => void) {
    this.socket?.on('delivery-update', callback);
  }

  // Live workouts
  joinLiveWorkout(workoutId: string) {
    this.socket?.emit('join-live-workout', workoutId);
  }

  sendWorkoutProgress(workoutId: string, progress: any) {
    this.socket?.emit('workout-progress', {
      workoutId,
      progress
    });
  }

  onWorkoutProgressUpdate(callback: (data: any) => void) {
    this.socket?.on('workout-progress-update', callback);
  }

  // Chat methods
  sendMessage(recipientId: string, message: string, type: string = 'text') {
    this.socket?.emit('send-message', {
      recipientId,
      message,
      type
    });
  }

  onNewMessage(callback: (data: any) => void) {
    this.socket?.on('new-message', callback);
  }

  // Typing indicators
  startTyping(recipientId?: string, consultationId?: string) {
    this.socket?.emit('typing-start', {
      recipientId,
      consultationId
    });
  }

  stopTyping(recipientId?: string, consultationId?: string) {
    this.socket?.emit('typing-stop', {
      recipientId,
      consultationId
    });
  }

  onUserTyping(callback: (data: any) => void) {
    this.socket?.on('user-typing', callback);
  }

  // Trainer status
  updateTrainerStatus(status: string, availability: any) {
    this.socket?.emit('trainer-status-update', {
      trainerId: this.userId,
      status,
      availability
    });
  }

  onTrainerStatusChanged(callback: (data: any) => void) {
    this.socket?.on('trainer-status-changed', callback);
  }

  // Notifications
  onNotification(callback: (data: any) => void) {
    this.socket?.on('notification', callback);
  }

  onAdminNotification(callback: (data: any) => void) {
    this.socket?.on('admin-notification', callback);
  }

  // Admin broadcasts
  sendAdminBroadcast(message: string, targetRole?: string, targetUsers?: string[]) {
    this.socket?.emit('admin-broadcast', {
      message,
      targetRole,
      targetUsers
    });
  }

  // Generic event listeners
  on(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  off(event: string, callback?: (data: any) => void) {
    this.socket?.off(event, callback);
  }

  emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }
}

export const socketService = new SocketService();
export default socketService;