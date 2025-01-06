import { GET_USERS } from "@/api/users";
import useFetch from "@/hooks/useFetch";
import { useState, useMemo } from "react";
import { View, Text, SafeAreaView, FlatList, RefreshControl, TextInput, StyleSheet, ListRenderItem, Button } from "react-native";
import UserCard from "@/components/UserCard";
import { useSelector } from "react-redux";
import { setUsers } from "@/store/general.store";
import type { User } from "@/store/general.store";
import { dispatch, RootState } from "@/store";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleUsersCount, setVisibleUsersCount] = useState(4); // fake pagination

  const { users: offlineUsers } = useSelector((state: RootState) => state.general);

  const {
    data: users,
    refetch,
    loading,
  } = useFetch<any>({
    GET: GET_USERS,
    onFetchSuccess: (data) => {
      dispatch(setUsers(data));
      setVisibleUsersCount(4);
    },
  });

  const filteredUsers = useMemo(() => {
    return users?.filter((user: any) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [users, searchQuery]);

  const renderItem: ListRenderItem<User> = ({ item }) => <UserCard name={item.name} email={item.email} address={item.address} />;

  const ListEmptyComponent = () => <Text style={styles.noUsersText}>No users found</Text>;

  const handleLoadMore = () => setVisibleUsersCount((prevCount) => prevCount + 4);

  return (
    <SafeAreaView style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search users..." value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* User list */}
      <FlatList
        data={filteredUsers?.slice(0, visibleUsersCount)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
      />

      {/* Load More Button */}
      {visibleUsersCount < (filteredUsers?.length || 0) && (
        <View style={styles.loadMoreContainer}>
          <Button title="Load More" onPress={handleLoadMore} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  noUsersText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 16,
  },
  loadMoreContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
});
