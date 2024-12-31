import { Mail, MessageCircle } from 'lucide-react';

export default function ContactSupport() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Need More Help?
      </h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:support@taskml.com"
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Mail className="h-6 w-6 text-blue-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Email Support</h3>
            <p className="text-sm text-gray-500">Get help via email</p>
          </div>
        </a>
        
        <button
          onClick={() => {/* Implement chat functionality */}}
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <MessageCircle className="h-6 w-6 text-blue-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Live Chat</h3>
            <p className="text-sm text-gray-500">Chat with our support team</p>
          </div>
        </button>
      </div>
    </div>
  );
}