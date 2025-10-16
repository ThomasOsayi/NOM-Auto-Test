import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';

const MOCK_NOMS = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      username: '@sarahfoodie',
      avatar: '👩🏻',
    },
    restaurant: 'Sage Vegan Bistro',
    dish: 'Buffalo Cauliflower Wings',
    rating: 4.8,
    description:
      'Absolutely incredible! The perfect amount of spice and the ranch dressing is divine 🔥',
    location: { city: 'Los Angeles', state: 'CA' },
    image: 'https://images.unsplash.com/photo-1587334207593-2bfa450c2317?w=800',
    likes: 124,
    tries: 45,
    tags: ['spicy', 'vegan', 'appetizer'],
    timestamp: '2h ago',
  },
  {
    id: '2',
    user: {
      name: 'Marcus Johnson',
      username: '@marcuseats',
      avatar: '👨🏾',
    },
    restaurant: 'Tacos El Gordo',
    dish: 'Carne Asada Tacos',
    rating: 5.0,
    description:
      'Best tacos in LA, hands down. The meat is perfectly seasoned and grilled to perfection.',
    location: { city: 'Los Angeles', state: 'CA' },
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    likes: 89,
    tries: 32,
    tags: ['mexican', 'meat', 'must-try'],
    timestamp: '5h ago',
  },
  {
    id: '3',
    user: {
      name: 'Emma Rodriguez',
      username: '@emmalovesFood',
      avatar: '👩🏽',
    },
    restaurant: 'Republique',
    dish: 'Chocolate Chip Cookie',
    rating: 4.9,
    description:
      'This cookie changed my life. Crispy edges, gooey center, and the perfect amount of sea salt.',
    location: { city: 'Los Angeles', state: 'CA' },
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
    likes: 203,
    tries: 87,
    tags: ['dessert', 'sweet', 'bakery'],
    timestamp: '1d ago',
  },
];

type Tab = 'recent' | 'following' | 'trending';

export default function ExploreScreen() {
  const { logout, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>NOM</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="bookmark-outline" size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {userProfile && (
          <Text style={styles.welcomeText}>
            Welcome, {userProfile.fullName.split(' ')[0]}! 👋
          </Text>
        )}

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants, dishes, or users..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'recent' && styles.tabActive]}
            onPress={() => setActiveTab('recent')}
          >
            <Ionicons
              name="time-outline"
              size={16}
              color={activeTab === 'recent' ? '#FFF' : '#374151'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'recent' && styles.tabTextActive,
              ]}
            >
              Recent
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'following' && styles.tabActive]}
            onPress={() => setActiveTab('following')}
          >
            <Ionicons
              name="people-outline"
              size={16}
              color={activeTab === 'following' ? '#FFF' : '#374151'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'following' && styles.tabTextActive,
              ]}
            >
              Following
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'trending' && styles.tabActive]}
            onPress={() => setActiveTab('trending')}
          >
            <Ionicons
              name="trending-up-outline"
              size={16}
              color={activeTab === 'trending' ? '#FFF' : '#374151'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'trending' && styles.tabTextActive,
              ]}
            >
              Trending
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={MOCK_NOMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NomCard nom={item} />}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function NomCard({ nom }: { nom: typeof MOCK_NOMS[0] }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>{nom.user.avatar}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{nom.user.name}</Text>
            <Text style={styles.userMeta}>
              {nom.user.username} · {nom.timestamp}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: nom.image }} style={styles.nomImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={16} color="#F97316" />
          <Text style={styles.ratingText}>{nom.rating}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.dishName}>{nom.dish}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#9CA3AF" />
          <Text style={styles.locationText}>
            {nom.restaurant} · {nom.location.city}, {nom.location.state}
          </Text>
        </View>

        <Text style={styles.description}>{nom.description}</Text>

        <View style={styles.tagsContainer}>
          {nom.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <View style={styles.actionsLeft}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setLiked(!liked)}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={24}
                color={liked ? '#EF4444' : '#9CA3AF'}
              />
              <Text style={styles.actionText}>
                {liked ? nom.likes + 1 : nom.likes}
              </Text>
            </TouchableOpacity>

            <View style={styles.actionButton}>
              <View style={styles.triedBadge}>
                <Ionicons name="checkmark" size={14} color="#FFF" />
              </View>
              <Text style={styles.actionText}>{nom.tries} tried</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => setSaved(!saved)}>
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={saved ? '#F97316' : '#9CA3AF'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F97316',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  tabActive: {
    backgroundColor: '#F97316',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  tabTextActive: {
    color: '#FFF',
  },
  feed: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  userMeta: {
    fontSize: 12,
    color: '#6B7280',
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
  },
  nomImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  cardContent: {
    padding: 16,
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F97316',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionsLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  triedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


