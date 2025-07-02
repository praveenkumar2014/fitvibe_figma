
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for demo
  const [isPaid, setIsPaid] = useState(true); // Set to true for demo
  const [selectedMainCategory, setSelectedMainCategory] = useState('men');
  const [selectedSubCategory, setSelectedSubCategory] = useState('protein-muscle');
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('whey-protein');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  const mainCategories = [
    { id: 'men', name: 'Men', icon: 'ri-user-line' },
    { id: 'women', name: 'Women', icon: 'ri-user-2-line' },
    { id: 'children', name: 'Children', icon: 'ri-bear-smile-line' },
    { id: 'equipment', name: 'Equipment', icon: 'ri-basketball-line' }
  ];

  const categoryStructure = {
    men: {
      'protein-muscle': {
        name: 'Protein & Muscle Building',
        icon: 'ri-heart-pulse-line',
        subcategories: {
          'whey-protein': 'Whey Protein',
          'mass-gainers': 'Mass Gainers',
          'creatine': 'Creatine',
          'bcaas': 'BCAAs',
          'pre-workout': 'Pre-Workout',
          'post-workout': 'Post-Workout Recovery'
        }
      },
      'weight-management': {
        name: 'Weight Management',
        icon: 'ri-scales-line',
        subcategories: {
          'fat-burners': 'Fat Burners',
          'meal-replacements': 'Meal Replacements',
          'keto-supplements': 'Keto Supplements'
        }
      },
      'vitamins-health': {
        name: 'Vitamins & Health Essentials',
        icon: 'ri-capsule-line',
        subcategories: {
          'multivitamins': 'Multivitamins',
          'omega-3': 'Omega-3 / Fish Oil',
          'joint-support': 'Joint Support',
          'testosterone-boosters': 'Testosterone Boosters',
          'immunity-boosters': 'Immunity Boosters'
        }
      }
    },
    women: {
      'protein-fitness': {
        name: 'Protein & Fitness Nutrition',
        icon: 'ri-heart-pulse-line',
        subcategories: {
          'womens-whey': "Women's Whey Protein",
          'collagen': 'Collagen Supplements',
          'bcaas-recovery': 'BCAAs & Recovery Blends'
        }
      },
      'weight-management': {
        name: 'Weight Management',
        icon: 'ri-scales-line',
        subcategories: {
          'slimming-teas': 'Slimming & Detox Teas',
          'meal-replacements': 'Meal Replacements',
          'fat-burners': 'Fat Burners'
        }
      }
    },
    children: {
      'growth-nutrition': {
        name: 'Growth & Nutrition',
        icon: 'ri-seedling-line',
        subcategories: {
          'kids-protein': 'Kids Protein Powders',
          'height-growth': 'Height & Growth Supplements',
          'dha-omega3': 'DHA & Omega-3'
        }
      }
    },
    equipment: {
      'cardio-equipment': {
        name: 'Cardio Equipment',
        icon: 'ri-run-line',
        subcategories: {
          'treadmills': 'Treadmills',
          'exercise-bikes': 'Exercise Bikes',
          'ellipticals': 'Ellipticals'
        }
      },
      'strength-equipment': {
        name: 'Strength Equipment',
        icon: 'ri-hammer-line',
        subcategories: {
          'dumbbells': 'Dumbbells',
          'barbells': 'Barbells',
          'resistance-bands': 'Resistance Bands'
        }
      }
    }
  };

  const products = [
    {
      id: 1,
      name: 'Premium Whey Protein Isolate',
      price: 2499,
      originalPrice: 2999,
      category: 'men',
      subCategory: 'protein-muscle',
      subSubCategory: 'whey-protein',
      rating: 4.8,
      reviews: 234,
      image: 'https://readdy.ai/api/search-image?query=Premium%20whey%20protein%20isolate%20powder%20container%20with%20modern%20packaging%20design%2C%20fitness%20supplement%20product%20photography%20on%20clean%20white%20background%20with%20green%20blue%20gradient%20accents%2C%20professional%20lighting&width=300&height=300&seq=prod001&orientation=squarish',
      vendor: 'FitNutri Pro',
      inStock: true,
      description: 'Fast-absorbing whey protein isolate for muscle building and recovery'
    },
    {
      id: 2,
      name: 'Mass Gainer Ultimate',
      price: 3999,
      originalPrice: 4599,
      category: 'men',
      subCategory: 'protein-muscle',
      subSubCategory: 'mass-gainers',
      rating: 4.7,
      reviews: 189,
      image: 'https://readdy.ai/api/search-image?query=Mass%20gainer%20protein%20powder%20container%20for%20weight%20gain%2C%20fitness%20supplement%20packaging%20on%20clean%20white%20background%20with%20green%20blue%20gradient%20theme%2C%20bulk%20muscle%20building%20nutrition%20product&width=300&height=300&seq=prod002&orientation=squarish',
      vendor: 'BulkFit',
      inStock: true,
      description: 'High-calorie mass gainer for lean muscle mass development'
    },
    {
      id: 3,
      name: 'Creatine Monohydrate Pure',
      price: 1299,
      originalPrice: 1599,
      category: 'men',
      subCategory: 'protein-muscle',
      subSubCategory: 'creatine',
      rating: 4.9,
      reviews: 445,
      image: 'https://readdy.ai/api/search-image?query=Creatine%20monohydrate%20powder%20container%20on%20clean%20white%20background%20with%20green%20blue%20gradient%20accents%2C%20pure%20fitness%20supplement%20for%20strength%20training%2C%20professional%20product%20photography&width=300&height=300&seq=prod003&orientation=squarish',
      vendor: 'PowerMax',
      inStock: true,
      description: 'Pure creatine monohydrate for strength and power enhancement'
    },
    {
      id: 4,
      name: "Women's Collagen Beauty Blend",
      price: 2199,
      originalPrice: 2599,
      category: 'women',
      subCategory: 'protein-fitness',
      subSubCategory: 'collagen',
      rating: 4.8,
      reviews: 312,
      image: 'https://readdy.ai/api/search-image?query=Womens%20collagen%20beauty%20supplement%20powder%20container%20with%20elegant%20feminine%20design%2C%20anti-aging%20beauty%20nutrition%20on%20clean%20white%20background%20with%20green%20blue%20gradient%20theme%2C%20premium%20packaging&width=300&height=300&seq=prod004&orientation=squarish',
      vendor: 'BeautyFit',
      inStock: true,
      description: 'Marine collagen for skin, hair, and nail health enhancement'
    },
    {
      id: 5,
      name: 'Smart Fitness Tracker Pro',
      price: 4999,
      originalPrice: 6999,
      category: 'equipment',
      subCategory: 'cardio-equipment',
      subSubCategory: 'fitness-trackers',
      rating: 4.9,
      reviews: 567,
      image: 'https://readdy.ai/api/search-image?query=Modern%20smart%20fitness%20tracker%20wearable%20device%20with%20sleek%20design%2C%20high-tech%20fitness%20gadget%20on%20clean%20background%20with%20green%20blue%20gradient%20lighting%20effects%2C%20premium%20wearable%20technology&width=300&height=300&seq=prod005&orientation=squarish',
      vendor: 'TechFit',
      inStock: true,
      description: 'Advanced fitness tracking with heart rate monitoring and GPS'
    },
    {
      id: 6,
      name: 'Professional Resistance Bands Set',
      price: 899,
      originalPrice: 1299,
      category: 'equipment',
      subCategory: 'strength-equipment',
      subSubCategory: 'resistance-bands',
      rating: 4.7,
      reviews: 289,
      image: 'https://readdy.ai/api/search-image?query=Professional%20resistance%20bands%20set%20for%20home%20workout%2C%20colorful%20fitness%20equipment%20arranged%20aesthetically%20on%20clean%20background%20with%20green%20blue%20gradient%20theme%2C%20versatile%20training%20tools&width=300&height=300&seq=prod006&orientation=squarish',
      vendor: 'HomeFit',
      inStock: true,
      description: 'Complete resistance band set for full-body workouts at home'
    }
  ];

  const filteredProducts = products.filter(product => {
    if (product.category !== selectedMainCategory) return false;
    if (product.subCategory !== selectedSubCategory) return false;
    if (selectedSubSubCategory !== 'all' && product.subSubCategory !== selectedSubSubCategory) return false;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max && (product.price < min || product.price > max)) return false;
      if (!max && product.price < min) return false;
    }
    return true;
  });

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Show access required message if not logged in
  if (!isLoggedIn || !isPaid) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-lock-line text-3xl text-blue-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
            <p className="text-gray-600 mb-6">
              Please complete your registration to access our premium fitness products catalog.
            </p>
            <div className="space-y-3">
              <Link 
                href="/login"
                className="block w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-full hover:from-green-600 hover:to-blue-600 font-medium transition-all whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link 
                href="/signup"
                className="block w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-full hover:bg-gray-50 font-medium transition-all whitespace-nowrap"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Premium Fitness <span className="text-yellow-300">Products</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover high-quality supplements, equipment, and nutrition products to fuel your fitness journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vendor-registration" className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all whitespace-nowrap">
              Sell Your Products
            </Link>
            <Link href="#products" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all whitespace-nowrap">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Advanced Category Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Categories
              </h2>
              
              {/* Main Categories */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Shop by Category</h3>
                <div className="space-y-2">
                  {mainCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedMainCategory(category.id);
                        setSelectedSubCategory(Object.keys(categoryStructure[category.id] || {})[0] || '');
                        setSelectedSubSubCategory('all');
                      }}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-all ${
                        selectedMainCategory === category.id
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center mr-3">
                        <i className={`${category.icon} text-lg`}></i>
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub Categories */}
              {categoryStructure[selectedMainCategory] && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Sub Categories</h3>
                  <div className="space-y-2">
                    {Object.entries(categoryStructure[selectedMainCategory]).map(([key, category]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedSubCategory(key);
                          setSelectedSubSubCategory('all');
                        }}
                        className={`w-full flex items-center p-2 rounded-lg text-left transition-all ${
                          selectedSubCategory === key
                            ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-800'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="w-5 h-5 flex items-center justify-center mr-2">
                          <i className={`${category.icon} text-sm`}></i>
                        </div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Sub Categories */}
              {categoryStructure[selectedMainCategory]?.[selectedSubCategory]?.subcategories && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Products</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedSubSubCategory('all')}
                      className={`w-full text-left p-2 rounded text-sm transition-all ${
                        selectedSubSubCategory === 'all'
                          ? 'bg-gradient-to-r from-green-50 to-blue-50 text-green-700 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      All Products
                    </button>
                    {Object.entries(categoryStructure[selectedMainCategory][selectedSubCategory].subcategories).map(([key, name]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedSubSubCategory(key)}
                        className={`w-full text-left p-2 rounded text-sm transition-all ${
                          selectedSubSubCategory === key
                            ? 'bg-gradient-to-r from-green-50 to-blue-50 text-green-700 font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="all">All Prices</option>
                  <option value="0-1000">Under ₹1,000</option>
                  <option value="1000-3000">₹1,000 - ₹3,000</option>
                  <option value="3000-5000">₹3,000 - ₹5,000</option>
                  <option value="5000">Above ₹5,000</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Fitness Products</span>
              <i className="ri-arrow-right-s-line mx-2"></i>
              <span className="text-blue-600">{mainCategories.find(c => c.id === selectedMainCategory)?.name}</span>
              {categoryStructure[selectedMainCategory]?.[selectedSubCategory] && (
                <>
                  <i className="ri-arrow-right-s-line mx-2"></i>
                  <span className="text-blue-600">{categoryStructure[selectedMainCategory][selectedSubCategory].name}</span>
                </>
              )}
              {selectedSubSubCategory !== 'all' && categoryStructure[selectedMainCategory]?.[selectedSubCategory]?.subcategories?.[selectedSubSubCategory] && (
                <>
                  <i className="ri-arrow-right-s-line mx-2"></i>
                  <span className="text-blue-600">
                    {categoryStructure[selectedMainCategory][selectedSubCategory].subcategories[selectedSubSubCategory]}
                  </span>
                </>
              )}
            </div>

            {/* Products Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredProducts.length} Products Found
                </h2>
                <p className="text-gray-600">Premium quality products for your fitness journey</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-grid-line"></i>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-list-unordered"></i>
                    </div>
                  </button>
                </div>
                
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'} id="products">
              {filteredProducts.map((product) => (
                <div key={product.id} className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`object-cover object-top ${
                        viewMode === 'list' ? 'w-full h-48' : 'w-full h-64'
                      }`}
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <i className="ri-heart-line text-lg"></i>
                    </button>
                  </div>
                  
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">{product.vendor}</span>
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            ₹{product.price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        </div>
                        <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className={`flex-1 py-3 px-4 rounded-full font-bold transition-all whitespace-nowrap ${
                            product.inStock 
                              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <i className="ri-shopping-cart-line mr-2"></i>
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <Link
                          href={`/services/products/${product.id}`}
                          className="px-4 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-all flex items-center justify-center"
                        >
                          <i className="ri-eye-line text-lg"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-shopping-bag-line text-4xl text-gray-400"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your filters or browse other categories.</p>
                <button 
                  onClick={() => {
                    setSelectedMainCategory('men');
                    setSelectedSubCategory('protein-muscle');
                    setSelectedSubSubCategory('all');
                    setPriceRange('all');
                  }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}