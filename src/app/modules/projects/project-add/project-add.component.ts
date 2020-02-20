import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { getRandomNuberByRange } from '../../../utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../models';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectAddComponent implements OnInit {
  title: string;
  covers: string[]; // 封面
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {title: string, project?: Project},
    private dialogRef: MatDialogRef<ProjectAddComponent>,
    private fb: FormBuilder
  ) {
    this.title = this.data.title;
    this.form = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      coverImg: ['', Validators.required]
    });
  }

  ngOnInit() {
    const numbers = Array.from({length: 24}, (_, i) => i + 1);
    this.covers = numbers.map(_ => `assets/img/covers/${getRandomNuberByRange(1, 39)}_tn.jpg`);
    if (this.data.project) {
      const project = this.data.project;
      this.form.patchValue({
        name: project.name,
        desc: project.desc,
        coverImg: project.coverImg
      });
    }
  }

  // 保存
  onSubmit({value}) {
    value = Object.assign({}, this.data.project, value, {
      coverImg: this.thumbToHD(value.coverImg),
      members: ['1']
    });
    this.dialogRef.close(value);
  }

  // 将缩率图转换成高清图
  private thumbToHD(src: string): string {
    return src.indexOf('_') > -1 ? `${src.split('_')[0]}.jpg` : src;
  }

}
