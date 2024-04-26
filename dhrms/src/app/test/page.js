"use client";
// 引入 Next.js 的必要组件和钩子
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const MenuPage = () => {

  // 使用 useNavigation 钩子获取 navigation 对象
  const navigation = useRouter();
  const testRoute = '/test/';

  // 定义一个数组来存储你的测试页面路由
  const testPages = [
    { name: 'Property ', path: `${testRoute}property` },
    { name: 'Create property', path: `${testRoute}property/create`},
    { name: 'Create property', path: `${testRoute}property/update`},
    { name: 'File', path: `${testRoute}file`},
    { name: 'Search', path: `${testRoute}search`},
    { name: 'Search with File', path: `${testRoute}search/file-address`},
    { name: 'Up load File', path: `${testRoute}file/upload`},
    { name: 'Lease ', path: `${testRoute}leases`},
    // 可以继续添加更多的测试页面
  ];

  // 程序化导航到指定页面的函数
  const navigateToPage = (path) => {
    navigation.push(path); // 使用 push 方法进行页面跳转
  };

  return (
    <div>
      <h1>Test Pages Menu</h1>
      <ul>
        {testPages.map(page => (
          <li key={page.path}>
            {/* 使用 Link 组件为每个页面创建一个链接 */}
            <Link href={page.path}>
              {page.name}
            </Link>
            {/* 添加一个按钮使用程序化导航 */}
            <button onClick={() => navigateToPage(page.path)}>
              Go to {page.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPage;
