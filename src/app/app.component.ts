import { environment } from './../environments/environment';
import { Component, ReflectiveInjector, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { darkTheme } from './configs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toggleTheme = false; // 切换主题，默认白天模式

  constructor(
    private overlayContainer: OverlayContainer,
    @Inject('BASE_CONFIG') baseConfig
  ) {
    // 使用依赖注入方式，手动创建注入器
    const inject = ReflectiveInjector.resolveAndCreate([
      { provide: Person, useClass: Person },
      { provide: Address, useFactory: () => {
          if (environment.production) {
            return new Address('北京', '北京', '朝阳', '来广营');
          } else {
            return new Address('黑龙江', '大庆', '萨尔图', '学府路');
          }
        }
      },
      { provide: Id, useFactory: () => {
          return Id.getInstance('idcard');
        }
      }
    ]);
    // 通过注入器实例化对象
    const person = inject.get(Person);
    // console.log('自定义注入器: ', person);
    // console.log('域名: ', baseConfig);
    const childInject = inject.resolveAndCreateChild([Person]);
    const personFromChild = childInject.get(Person);
    // console.log('父注解器和子注解器创建实例是否相等: ', person === personFromChild);
  }

  switchTheme(mEvent: boolean) {
    this.toggleTheme = mEvent;
    // 切换Dialog、Select、menu等等浮窗的主题色，即：叠加
    if (mEvent) {
      this.overlayContainer.getContainerElement().classList.add(darkTheme);
    } else {
      this.overlayContainer.getContainerElement().classList.remove(darkTheme);
    }
  }

  // 切换主题
  onToggleTheme() {
    return this.toggleTheme ? darkTheme : null;
  }

}


/*
 * 依赖注入从0到1的理解例子
 */
class Id {
  static getInstance(type: string) {
    return new Id();
  }
}

class Address {
  province: string;
  city: string;
  district: string;
  street: string;
  constructor(province: string, city: string, district: string, street: string) {
    this.province = province;
    this.city = city;
    this.district = district;
    this.street = street;
  }
}

class Person {
  id: Id;
  address: Address;
  // 第一种：直接在构造方法总实例化
  // constructor() {
  //   this.id = Id.getInstance('idcard');
  //   this.address = new Address('北京', '北京', '朝阳', '来广营');
  // }
  // 第二种：构造方法接收外部实例化转入
  // constructor(id: Id, address: Address) {
  //   this.id = id;
  //   this.address = address;
  // }
  // 第三种：使用依赖注入
  constructor(@Inject(Id) id, @Inject(Address) address) {
    this.id = id;
    this.address = address;
  }
}

// 主函数，相当于依赖注入provider池子
function main() {
  const id = Id.getInstance('idcard');
  const address = new Address('北京', '北京', '朝阳', '来广营');
  const person = new Person(id, address);
}
