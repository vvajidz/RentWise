"use client";

import { useEffect, useState } from "react";
import Header from "@/components/adminDashboard/header";
import Navigation from "@/components/adminDashboard/navigation";
import Overview from "@/components/adminDashboard/overview";
import Properties from "@/components/adminDashboard/properties";
import Users from "@/components/adminDashboard/users";
import Notifications from "@/components/adminDashboard/notification";
import Settings from "@/components/adminDashboard/settings";
import Modal from "@/components/adminDashboard/modal";
import { Property, User } from "@/types/admin";
import { useRouter } from "next/navigation";
import { useAdminStore } from "../golNimda/adminStore";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Property | User | null>(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const { admin, isAuthenticated } = useAdminStore();

  // Wait until client-side hydration to check store
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if not authenticated after hydration
  useEffect(() => {
    if (isClient && (!isAuthenticated || !admin)) {
      router.replace("/");
    }
  }, [isClient, isAuthenticated, admin, router]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "properties":
        return (
          <Properties
            onViewItem={(item) => {
              setSelectedItem(item);
              setShowModal(true);
            }}
          />
        );
      case "users":
        return (
          <Users
            onViewItem={(item) => {
              setSelectedItem(item);
              setShowModal(true);
            }}
          />
        );
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  // Prevent any rendering until we know auth state
  if (!isClient || !isAuthenticated || !admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <div className="shadow-sm sticky top-0 z-20 bg-white">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={
                selectedItem
                  ? "name" in selectedItem
                    ? selectedItem.name
                    : "User Details"
                  : "Details"
              }
            >
              {selectedItem && (
                <div className="space-y-4">
                  {"name" in selectedItem && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded shadow-sm">
                          {selectedItem.name}
                        </p>
                      </div>
                      {"owner" in selectedItem && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Owner
                          </label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded shadow-sm">
                            {selectedItem.owner}
                          </p>
                        </div>
                      )}
                      {"location" in selectedItem && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded shadow-sm">
                            {selectedItem.location}
                          </p>
                        </div>
                      )}
                      {"email" in selectedItem && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded shadow-sm">
                            {selectedItem.email}
                          </p>
                        </div>
                      )}
                      {"type" in selectedItem && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Property Type
                          </label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded shadow-sm">
                            {selectedItem.type}
                          </p>
                        </div>
                      )}
                      {"rent" in selectedItem && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Monthly Rent
                          </label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded shadow-sm">
                            ₹{selectedItem.rent.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
