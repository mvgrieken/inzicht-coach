import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/utils/tailwind';
import { KNOWLEDGE_ARTICLES, EXERCISES, CATEGORIES } from '@/data/knowledgeBase';

export default function KnowledgeScreen() {
  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900`}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <Text style={tw`text-2xl font-bold text-primary-500 mb-6 text-center`}>
            Kennisbank 📚
          </Text>
          
          {/* Categories */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
              Categorieën
            </Text>
            <View style={tw`flex-row flex-wrap gap-3`}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity 
                  key={category.id}
                  style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm flex-1 min-w-40 items-center`}
                >
                  <Text style={tw`text-3xl mb-2`}>{category.icon}</Text>
                  <Text style={tw`text-sm font-bold text-neutral-800 dark:text-neutral-200 text-center mb-1`}>
                    {category.title}
                  </Text>
                  <Text style={tw`text-xs text-neutral-600 dark:text-neutral-400 text-center`}>
                    {category.subtitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Featured Articles */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
              Aanbevolen artikelen
            </Text>
            
            {KNOWLEDGE_ARTICLES.slice(0, 3).map((article) => (
              <TouchableOpacity 
                key={article.id}
                style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-3 shadow-sm`}
              >
                <View style={tw`flex-row justify-between items-start mb-2`}>
                  <Text style={tw`text-base font-bold text-neutral-800 dark:text-neutral-200 flex-1 mr-2`}>
                    {article.title}
                  </Text>
                  <Text style={tw`text-xs text-neutral-500 dark:text-neutral-400`}>
                    {article.readTime} min
                  </Text>
                </View>
                <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 leading-5`}>
                  {article.content.split('\n')[0].slice(0, 120)}...
                </Text>
                <View style={tw`flex-row flex-wrap gap-1 mt-2`}>
                  {article.tags.slice(0, 2).map((tag) => (
                    <View 
                      key={tag}
                      style={tw`px-2 py-1 bg-primary-100 dark:bg-primary-900/30 rounded`}
                    >
                      <Text style={tw`text-xs text-primary-700 dark:text-primary-300`}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Exercises */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
              Oefeningen & Tools
            </Text>
            
            {EXERCISES.map((exercise) => (
              <TouchableOpacity 
                key={exercise.id}
                style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-3 flex-row items-center shadow-sm`}
              >
                <Text style={tw`text-3xl mr-4`}>{exercise.icon}</Text>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-base font-bold text-neutral-800 dark:text-neutral-200 mb-1`}>
                    {exercise.title}
                  </Text>
                  <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 leading-5`}>
                    {exercise.description}
                  </Text>
                  <Text style={tw`text-xs text-primary-500 mt-1`}>
                    {exercise.duration} minuten
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}